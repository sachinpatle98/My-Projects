import mongoose from "mongoose";

const userNoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}
    , { timestamps: true }
);

const UserNote = mongoose.model("UserNote", userNoteSchema);

export default UserNote;
