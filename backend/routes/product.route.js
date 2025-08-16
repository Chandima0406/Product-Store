import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import { getProducts } from "../controllers/product.controller.js";
import { createProduct } from "../controllers/product.controller.js";
import { deleteProduct } from "../controllers/product.controller.js";
import { getsingleProductbyid } from "../controllers/product.controller.js";
import { updateProductbyid } from "../controllers/product.controller.js";


//create products
router.post("/", createProduct);

// DELETE product by ID
router.delete("/:id", deleteProduct);

// GET all products
router.get("/", getProducts);

// GET single product by ID
router.get("/:id", getsingleProductbyid);

// UPDATE product by ID (partial update allowed)
router.put("/:id", updateProductbyid);

export default router;
