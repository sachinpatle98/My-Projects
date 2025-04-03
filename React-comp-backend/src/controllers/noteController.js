
import jwt from 'jsonwebtoken';
import NoteModel from '../models/NoteModel.js';


const getAllNotes = async (req, res) => {
    let token = req.headers.authorization;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
        try {
            let data = await NoteModel.find({ user: decode.useerID });
            res.send({
                data: data,
                message: "Successful",
                status: 1
            })
            console.log(data)

        } catch (error) {
            res.send({
                message: error.message,
                status: 0
            })
        }
    })
}

const createNote = async (req, res) => {
    try {
        let note = new NoteModel(req.body);
        await note.save();
        res.send({
            message: "Note Created",
            status: 1
        })

    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
}

const updateNote = async (req, res) => {
    let { id } = req.headers;

    try {
        await NoteModel.findByIdAndUpdate({ _id: id }, req.body);
        res.send({
            message: "Note updated",
            status: 1
        })

    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
}

const delteNote = async (req, res) => {
    let { id } = req.headers;

    try {
        await NoteModel.findByIdAndDelete({ _id: id });
        res.send({
            message: "Note deleted",
            status: 1
        })

    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
}

export { getAllNotes, createNote, updateNote, delteNote }