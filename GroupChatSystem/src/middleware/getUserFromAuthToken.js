import jwt from "jsonwebtoken";
import User from "../model/user.js";

const getUserFromAuthToken = async function (req, res, next) {
    try {
        const authToken = req.headers['authorization'];
        console.log("Auth token:", authToken); 

        const match = authToken && authToken.match(new RegExp("^Bearer (.*)$"));
        if (match && match[1]) {
            const payload = jwt.verify(match[1], process.env.JWT_SECRET_KEY);
            console.log("Decoded Payload:", payload);  

            if (!payload) {
                throw new Error("Invalid token payload.");
            }

            if (payload.userid) {
                const user = await User.findById(payload.userid);  
                if (!user) {
                    return res.status(404).json({ error: "User not found." });
                }

                req.user = user;
                console.log("Authenticated user:", user);
            } else {
                return res.status(401).json({ error: "User ID not found in token." });
            }
        }
        next(); 
    } catch (e) {
        console.error("Auth Error: ", e.message);
        return res.status(401).json({ error: e.message });
    }
};

export default getUserFromAuthToken;
