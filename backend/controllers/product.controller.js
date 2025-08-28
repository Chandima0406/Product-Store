import mongoose from "mongoose";
import product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await product.find();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error in get products:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const createProduct = async (req, res) => {
  const productdata = req.body;

  if (!productdata.name || !productdata.price || !productdata.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }

  const newProduct = new product(productdata);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("error in create product:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  try {
    const deletedProduct = await product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error in delete product:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getsingleProductbyid = async (req, res) => {
  const { id } = req.params;

  try {
    const singleProduct = await product.findById(id);

    if (!singleProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: singleProduct,
    });
  } catch (error) {
    console.error("Error in get product:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateProductbyid = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // Can contain one or more fields

  try {
    const updatedProduct = await product.findByIdAndUpdate(
      id,
      { $set: updateData }, // Only update provided fields
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error in update product:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
