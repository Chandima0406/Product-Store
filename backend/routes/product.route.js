import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import { 
  getProducts, 
  createProduct, 
  deleteProduct, 
  getsingleProductbyid, 
  updateProductbyid,
  getProductsByCategory,
  getCategories 
} from "../controllers/product.controller.js";

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

// GET all products (with optional category filtering via query parameter)
// Example: /api/products?category=Electronics
router.get("/", getProducts);

// GET products by specific category
// Example: /api/products/category/Electronics
router.get("/category/:category", getProductsByCategory);

// GET all available categories
// Example: /api/products/categories
router.get("/categories", getCategories);

// GET single product by ID
router.get("/:id", validateObjectId, getsingleProductbyid);

// CREATE new product
router.post("/", createProduct);

// UPDATE product by ID (partial update allowed)
router.put("/:id", validateObjectId, updateProductbyid);

// DELETE product by ID
router.delete("/:id", validateObjectId, deleteProduct);

export default router;