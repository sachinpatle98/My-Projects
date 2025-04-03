import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
}
    , { timestamps: true }
);

const NoteModel = mongoose.model("note", noteSchema);

export default NoteModel;
