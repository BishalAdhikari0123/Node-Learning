
import { Router } from "express";
import validate from "../middlewares/validate.js"
import authValidation from "../validations/auth.js"
import authController from "../controllers/auth.js";
const authRouter = Router();

authRouter.post("/register", validate(authValidation.register), authController.register )

authRouter.post("/login", validate(authValidation.login), authController.login )



export default authRouter;
