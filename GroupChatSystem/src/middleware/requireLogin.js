import { catchAsync } from "../helpers/catchAsync.js";

const requireLogin = catchAsync(function (req, res, next) {
    if (!req.user) {
        throw new Error("Login Needed to access this route.");
    } else {
        return next();
    }
})

export default requireLogin