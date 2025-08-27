import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import { getProducts, createProduct, deleteProduct, getsingleProductbyid, updateProductbyid } from "../controllers/product.controller.js";
// import { createProduct } from "../controllers/product.controller.js";
// import { deleteProduct } from "../controllers/product.controller.js";
// import { getsingleProductbyid } from "../controllers/product.controller.js";
// import { updateProductbyid } from "../controllers/product.controller.js";

// Middleware to validate MongoDB ID
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ 
      success: false,
      message: "Invalid product ID format"
    });
  }
  next();
};

//create products
router.post("/", createProduct);

// DELETE product by ID
router.delete("/:id", validateObjectId, deleteProduct);

// GET all products
router.get("/", getProducts);

// GET single product by ID
router.get("/:id", validateObjectId, getsingleProductbyid);

// UPDATE product by ID (partial update allowed)
router.put("/:id", validateObjectId, updateProductbyid);

export default router;
