import { Router } from "express";
import authRouter from "./auth.js";
import productRouter from "./product.js";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/product",productRouter);
export default routes;