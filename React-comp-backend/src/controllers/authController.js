import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { OAuth2Client } from "google-auth-library";

import User from '../models/User.js';
import LoginSessionModel from '../models/LoginSession.js';

dotenv.config();


// signup 

const register = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // validate email
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ statusCode: 400, message: "All fields are required" })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ statusCode: 400, message: "Passwords do not match" })
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ statusCode: 400, message: "User already exists" })
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save();

        res.status(201).json({ statusCode: 201, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: "Server Error", error });
    }
}

// 
// login

const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        // validate email
        if (!email || !password) {
            return res.status(400).json({ statusCode: 400, message: "All fields are required" })
        }

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ statusCode: 400, message: "Invalid email or password" })
        }

        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ statusCode: 400, message: "Invalid credentials" })
        }

        // create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Capture login session details
        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];
        const timestamp = new Date().toISOString();

        // Save login session to the database
        const newSession = new LoginSessionModel({
            userId: user._id,
            device: userAgent,
            ip: ipAddress,
            timestamp: timestamp
        });

        await newSession.save();

        // Send response
        res.status(200).json({
            statusCode: 200,
            message: "Login successful",
            payload: { id: user._id, name: user.name, email: user.email },
            token
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ statusCode: 500, message: "Server Error", error: error.message });
    }

}

const getUserLoginSessions = async (req, res) => {
    try {
        const userId = req?.user;
        const sessions = await LoginSessionModel.find({ userId }).sort({ timestamp: -1 });

        res.status(200).json({ statusCode: 200, data: sessions });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: "Server Error", error });
    }
};


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ statusCode: 404, message: "User not found" });
        }

        // Generate Reset Token (valid for 1 hour)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log(token)

        // Update user reset token in DB
        user.resetToken = token;
        await user.save();

        // Reset password link
        const resetLink = `http://localhost:5173/project/1/auth/reset-password/${token}`;

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`
        });

        res.status(200).json({ statusCode: 200, message: "Reset link sent successfully!" });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ statusCode: 500, message: "Server Error", error: error.message });
    }
};

const logout = async (req, res) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(400).json({ statusCode: 400, message: "No token provided" });
        }

        res.status(200).json({ statusCode: 200, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: "Server Error", error: error.message });
    }
};




const resetPassword = async (req, res) => {
    console.log("resetPassword")
    try {
        const { password } = req.body;
        const { token } = req.params;



        // Validate the token & find the user (Modify this logic as per your DB)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        await user.save();

        res.json({ message: "Password reset successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const findOrCreateUser = async (payload) => {
    let user = await User.findOne({ email: payload.email });

    if (!user) {
        user = new User({
            name: payload.name,
            email: payload.email,
            googleId: payload.sub,
            profilePic: payload.picture,
        });
        await user.save();
    }

    return user;
};

const SECRET_KEY = process.env.JWT_SECRET;

const generateJWT = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        SECRET_KEY,
        { expiresIn: "1h" }
    );
};


const googleLogin = async (req, res) => {
    try {
        console.log("Inside googleLogin");

        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        // Verify token with Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID, // Ensure token is for your app
        });

        const payload = ticket.getPayload();
        console.log("Google Payload:", payload);

        if (!payload.email_verified) {
            return res.status(401).json({ message: "Google account not verified" });
        }

        // Find or create user in database
        const user = await findOrCreateUser(payload);

        const userDetails = {
            _id: user._id,
            fullname: user.name,
            email: user.email,
        }

        // Generate JWT token for session
        const jwtToken = generateJWT(user);

        res.json({ token: jwtToken, userDetails });
    } catch (error) {
        console.error("Google Login Error:", error);
        res.status(500).json({ message: "Google login failed" });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req?.user;

        console.log("userId", userId)

        const user = await User.findById(userId).select('-password'); // Exclude password field

        console.log("user===", user)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ statusCode: 200, message: 'Profile fetched successfully', payload: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req?.user;
        const { name, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true, runValidators: true } // Return updated user, validate input
        ).select('-password'); // Exclude password field

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ statusCode: 200, message: 'Profile updated successfully', payload: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export { register, login, forgetPassword, logout, resetPassword, googleLogin, getUserLoginSessions, getProfile, updateProfile };