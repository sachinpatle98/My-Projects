import mongoose from "mongoose";

const LoginSessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    device: { type: String, required: true },
    ip: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const LoginSessionModel = mongoose.model("LoginSession", LoginSessionSchema);

export default LoginSessionModel;
