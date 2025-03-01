const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Create a new product
router.post("/", (req, res) => {
    const { name, description, price, stock } = req.body;
    if (!name || !description || !price || !stock) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, description, price, stock], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.status(201).json({ message: "Product added successfully", productId: result.insertId });
    });
});

// Get all products
router.get("/", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.json(results);
    });
});

// Get a single product by ID
router.get("/:id", (req, res) => {
    const productId = req.params.id;
    db.query("SELECT * FROM products WHERE id = ?", [productId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(result[0]);
    });
});

// Update a product
router.put("/:id", (req, res) => {
    const productId = req.params.id;
    const { name, description, price, stock } = req.body;

    const sql = "UPDATE products SET name=?, description=?, price=?, stock=? WHERE id=?";
    db.query(sql, [name, description, price, stock, productId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.json({ message: "Product updated successfully" });
    });
});

// Delete a product
router.delete("/:id", (req, res) => {
    const productId = req.params.id;
    db.query("DELETE FROM products WHERE id = ?", [productId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.json({ message: "Product deleted successfully" });
    });
});

module.exports = router;
