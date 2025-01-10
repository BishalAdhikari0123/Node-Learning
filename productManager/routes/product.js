
import { Router } from "express";

import validate from "../middlewares/validate.js"
import productValidation from "../validations/product.js"
import productController from "../controllers/product.js";
import requireLogin from "../middlewares/requireLogin.js";

const productRouter = Router();

productRouter.get("/view", productController.getProducts )

productRouter.post("/add",requireLogin, validate(productValidation.create), productController.addProduct )

productRouter.get("/userid/:userId",productController.getProductByUserId)
productRouter.get("/productid/:productId",productController.getProductById)
productRouter.put("/modify/:productId",requireLogin, validate(productValidation.create), productController.updateProduct )
productRouter.delete("/delete/:productId",requireLogin, productController.deleteProduct )

export default productRouter;
