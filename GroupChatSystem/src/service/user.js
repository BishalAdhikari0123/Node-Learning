import User from "../model/user.js"; // Default import
import jwt from "jsonwebtoken";

const findUserByEmail = async function (email) {
    const user = await User.findOne({ email });
    if (user) return user.toObject();
    else return null;
}

const createJWT=(userid)=>{
    return jwt.sign({userid},process.env.JWT_Secret_Key)
}

export { createJWT ,findUserByEmail }
