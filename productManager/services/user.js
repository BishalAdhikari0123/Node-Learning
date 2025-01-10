import User from "../models/user.js"
import jwt from "jsonwebtoken"

const findUserByEmail = async function (email) {
    const user = await User.findOne({ email });
    if (user) return user.toObject();
    else return null;
}
const createJWT = function (userId) {
    return jwt.sign({ sub: userId }, process.env.JWT_SECRET_KEY);
}

export { createJWT ,findUserByEmail }