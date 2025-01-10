import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true, },
    address: { type: String, required: true, },
    email: { type: String, required: true, },
    phone: { type: String, required: true, },
    password: { type: String, required: true, },
}, { timestamps: true })

const User = model("User", userSchema);

export default User