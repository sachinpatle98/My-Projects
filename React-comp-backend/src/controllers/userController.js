
import  bcrypt  from 'bcryptjs';
import UserNote from '../models/UserNoteModel.js';
import jwt from 'jsonwebtoken';


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let data = await UserNote.find({ email });
        if (data.length > 0) {
            return res.send({ message: "Email already exists!", status: 0 });
        }

        const hash = await bcrypt.hash(password, 5);

        let user = new UserNote({ name, email, password: hash });
        await user.save();

        return res.send({ message: "User created successfully", status: 1 });

    } catch (error) {
        return res.send({ message: error.message, status: 0 });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    let option = {
        expiresIn: "1d"
    }

    try {

        let data = await UserNote.find({ email });
        if (data.length > 0) {

            let token = jwt.sign({ userID: data[0]._id }, process.env.JWT_SECRET, option);

            bcrypt.compare(password, data[0].password, function (err, result) {
                if (err) return res.send({
                    message: "Something went wrong: " + err,
                    status: 0
                })
                if (result)
                    res.send({
                        message: "Login successful",
                        user: data[0].name,
                        token: token,
                        status: 1
                    })
                else
                    res.send({
                        message: "Incorrect password",
                        status: 0
                    })
            });
        }
        else {
            res.send({
                message: "User does not exist",
                status: 0
            })
        }

    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }

}

export { register, login }