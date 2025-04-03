import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid Authorization format" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    if (!token) {
        return res.status(401).json({ message: "Access Denied! Token is missing." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        req.user = decoded.id;
        next();
    } catch (error) {
        console.error("JWT Verification Failed:", error.message); 
        res.status(400).json({ message: "Invalid Token", error: error.message });
    }
}

export default authMiddleware;