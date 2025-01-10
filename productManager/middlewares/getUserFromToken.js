import jwt from "jsonwebtoken"
import User from "../models/user.js";

const getUserFromAuthToken = async function (req, res, next) {
    try {
        const authToken = req.headers['authorization'];
        const match = authToken.match(new RegExp("^Bearer (.*)$"))
        if (match && match[1]) {
            const payload = jwt.verify(match[1], process.env.JWT_SECRET_KEY)

            if (!payload) throw new Error("Payload could not be read.");

            if (payload.sub) {
                const userId = payload.sub;
                const user = await User.findOne({ _id: userId });
                // modify the the request object for accesing in other routes and controllers
                req.user = user;
                console.log("Login found of: " + user.name);
            } else {
                throw new Error("Subject not found in payload.");
            }
        } else {
            throw new Error("Bearer token not found.");
        }
    } catch (e) {
        console.log("Auth Error: ", e.message)
    } finally {
        next();
    }
}

export default getUserFromAuthToken;