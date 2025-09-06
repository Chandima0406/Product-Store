import mongoose from "mongoose";
import product from "../models/product.model.js";

// Define the valid categories based on your enum
const validCategories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Kitchen',
  'Sports & Outdoors',
  'Beauty & Personal Care',
  'Toys & Games',
  'Food & Beverages',
  'Other'
];

export const getProducts = async (req, res) => {
  try {
    // Optional: Add category filtering
    const { category } = req.query;
    let filter = {};
    
    if (category && validCategories.includes(category)) {
      filter.category = category;
    }
    
    const products = await product.find(filter);
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

  // Check for all required fields including category
  if (!productdata.name || !productdata.price || !productdata.image || !productdata.description || !productdata.category) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields: name, price, image, description, and category" });
  }

  // Validate category
  if (!validCategories.includes(productdata.category)) {
    return res.status(400).json({
      success: false,
      message: `Invalid category. Must be one of: ${validCategories.join(', ')}`,
      validCategories: validCategories
    });
  }

  // Validate price is a positive number
  if (isNaN(productdata.price) || parseFloat(productdata.price) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Price must be a positive number"
    });
  }

  const newProduct = new product(productdata);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in create product:", error.message);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors
      });
    }
    
    res.status(500).json({ success: false, message: "Server error" });
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
  const updateData = req.body;

  // Validate category if provided in update
  if (updateData.category && !validCategories.includes(updateData.category)) {
    return res.status(400).json({
      success: false,
      message: `Invalid category. Must be one of: ${validCategories.join(', ')}`,
      validCategories: validCategories
    });
  }

  // Validate price if provided in update
  if (updateData.price && (isNaN(updateData.price) || parseFloat(updateData.price) <= 0)) {
    return res.status(400).json({
      success: false,
      message: "Price must be a positive number"
    });
  }

  try {
    const updatedProduct = await product.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true } // runValidators ensures schema validation
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
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  if (!validCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: `Invalid category. Must be one of: ${validCategories.join(', ')}`,
      validCategories: validCategories
    });
  }

  try {
    const products = await product.find({ category });
    res.status(200).json({
      success: true,
      data: products,
      category: category,
      count: products.length
    });
  } catch (error) {
    console.error("Error in get products by category:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all available categories
export const getCategories = async (req, res) => {
  try {
    // Get distinct categories from the database
    const categories = await product.distinct("category");
    
    res.status(200).json({
      success: true,
      data: categories,
      allCategories: validCategories // Also return the predefined categories
    });
  } catch (error) {
    console.error("Error in get categories:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};