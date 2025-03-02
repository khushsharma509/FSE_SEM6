const express = require("express");
const db = require("../config/db");

const router = express.Router();

// ✅ Add an order item
router.post("/", (req, res) => {
    const { order_id, product_id, quantity, price } = req.body;

    if (!order_id || !product_id || !quantity || !price) {
        return res.status(400).json({ error: "All fields (order_id, product_id, quantity, price) are required." });
    }

    const sql = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
    db.query(sql, [order_id, product_id, quantity, price], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.status(201).json({ message: "Order item added successfully", order_item_id: result.insertId });
    });
});

// ✅ Get all order items
router.get("/", (req, res) => {
    db.query("SELECT * FROM order_items", (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.json(results);
    });
});

// ✅ Get a single order item by ID
router.get("/:id", (req, res) => {
    const orderItemId = req.params.id;
    db.query("SELECT * FROM order_items WHERE order_item_id = ?", [orderItemId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Order item not found." });
        }
        res.json(result[0]);
    });
});

// ✅ Update an order item
router.put("/:id", (req, res) => {
    const orderItemId = req.params.id;
    const { order_id, product_id, quantity, price } = req.body;

    if (!order_id || !product_id || !quantity || !price) {
        return res.status(400).json({ error: "All fields (order_id, product_id, quantity, price) are required." });
    }

    const sql = "UPDATE order_items SET order_id=?, product_id=?, quantity=?, price=? WHERE order_item_id=?";
    db.query(sql, [order_id, product_id, quantity, price, orderItemId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.json({ message: "Order item updated successfully." });
    });
});

// ✅ Delete an order item
router.delete("/:id", (req, res) => {
    const orderItemId = req.params.id;
    db.query("DELETE FROM order_items WHERE order_item_id = ?", [orderItemId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.json({ message: "Order item deleted successfully." });
    });
});

module.exports = router;
