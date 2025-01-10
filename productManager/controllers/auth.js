import { catchAsync } from "../helpers/catchAsync.js";
import User from "../models/user.js";

import { createJWT, findUserByEmail } from "../services/user.js";
import bcrypt from 'bcrypt'

const register = catchAsync(async function (req, res) {

    const existingUser = await findUserByEmail(req.body.email);

    if (existingUser) {
        throw new Error("Email already taken");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = (await User.create({ ...req.body, password: hashedPassword })).toObject();

    return res.send({ user: { ...newUser, password: undefined } })

})

const login = catchAsync(async function (req, res) {

    const { email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
        throw new Error("User not found.");
    }

    const hashedPassword = existingUser.password;

    const matched = await bcrypt.compare(password, hashedPassword)

    if (matched) {
        
        // res.setHeader("X-user-id", existingUser._id);
       
            const token = createJWT(existingUser._id);
            return res.send({ user: { ...existingUser, password: undefined, token } })
    
        // return res.send({
        //     user: { ...existingUser, password: undefined,__v:undefined 

        //     },
        // });
        // return res.send({ user: { ...existingUser, password: undefined } })
    } else throw new Error("Email or password invalid.")

})

const authController = { register, login }

export default authController;