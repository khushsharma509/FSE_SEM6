const Product = require("../models/product");

// Create a new product
exports.createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    if (!name || !description || !price || !stock) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const productId = await Product.create({ name, description, price, stock });
        res.status(201).json({ message: "Product added successfully", productId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    try {
        await Product.update(req.params.id, { name, description, price, stock });
        res.json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        await Product.delete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
