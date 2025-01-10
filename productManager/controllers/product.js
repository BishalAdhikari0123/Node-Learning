import { catchAsync } from "../helpers/catchAsync.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import mongoose from "mongoose";

// const getProducts = catchAsync(async function (req, res) {
//     const products = await Product.find();
//     return res.status(200).send({ products });
// });
   //get all product
const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
//add product
const addProduct = catchAsync(async function (req, res) {

    const newProduct = await Product.create({ ...req.body, createdBy: req.user._id })

    return res.status(201).send({ product: newProduct })

});

//get product by userid
const getProductByUserId = catchAsync(async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    const userProducts = await Product.find({ createdBy: userId });

    if (userProducts) {
        return res.status(200).json({ products: userProducts });
    }

    res.status(404).json({ message: "No products found created by this user" });
});

//get products by id
const getProductById = catchAsync(async (req, res) => {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findById(productId);

    if (product) {
        return res.status(200).json({ product });
    }

    res.status(404).json({ message: "Product not found for this ID!" });
});




// const addProduct = catchAsync(async function (req, res) {
//     const { name, cost, stockQuantity } = req.body;

//     const userId = req.headers['x-user-id'];

//     if (!userId) {
//         return res.status(400).send({ message: "User ID is required in the header" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//         return res.status(400).send({ message: "Invalid user ID" });
//     }

//     const user = await User.findById(userId);

//     if (!user) {
//         return res.status(404).send({ message: "User does not exist" });
//     }

//     const newProduct = await Product.create({
//         name,
//         cost,
//         stockQuantity,
//         createdBy: userId,
//     });

//     return res.status(201).send({ product: newProduct });
// });
const updateProduct = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const updates = req.body;

    console.log(updates)

    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: "Invalid product ID" });
    }
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    
    // if (!req.user || product.createdBy !== req.user._id) {
   
    if (product.createdBy.toString() !== req.user._id.toString()){
        return res.status(403).json({ error: "You are not authorized to edited this product" });
    }

product.name= updates.name
product.cost= updates.cost
product.stockQuantity= updates.stockQuantity
await product.save();

    // const updatedProduct = await Product.findByIdAndUpdate(productId, updates);
    res.status(200).json({ product: product });
});

const deleteProduct = catchAsync(async (req, res) => {
    const { productId } = req.params;
    // const updates = req.body;

    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: "Invalid product ID" });
    }
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    if (product.createdBy.toString() !== req.user._id.toString()){
        return res.status(403).json({ error: "You are not authorized to delete this product" });
    }
    const updatedProduct = await Product.findByIdAndDelete(productId);
    res.status(200).json({deleted:"Product Deleted Successfully"});
});

const productController = { getProducts, addProduct,getProductByUserId,getProductById,updateProduct,deleteProduct };

export default productController;
