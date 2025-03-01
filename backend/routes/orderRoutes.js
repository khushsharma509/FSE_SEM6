const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Create a new order
router.post("/", (req, res) => {
    const { user_id, product_id, quantity, total_price } = req.body;
    if (!user_id || !product_id || !quantity || !total_price) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)";
    db.query(sql, [user_id, product_id, quantity, total_price], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.status(201).json({ message: "Order placed successfully", orderId: result.insertId });
    });
});

// Get all orders
router.get("/", (req, res) => {
    db.query("SELECT * FROM orders", (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.json(results);
    });
});

// Get a single order by ID
router.get("/:id", (req, res) => {
    const orderId = req.params.id;
    db.query("SELECT * FROM orders WHERE id = ?", [orderId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(result[0]);
    });
});

// Update an order
router.put("/:id", (req, res) => {
    const orderId = req.params.id;
    const { user_id, product_id, quantity, total_price } = req.body;

    const sql = "UPDATE orders SET user_id=?, product_id=?, quantity=?, total_price=? WHERE id=?";
    db.query(sql, [user_id, product_id, quantity, total_price, orderId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.json({ message: "Order updated successfully" });
    });
});

// Delete an order
router.delete("/:id", (req, res) => {
    const orderId = req.params.id;
    db.query("DELETE FROM orders WHERE id = ?", [orderId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.json({ message: "Order deleted successfully" });
    });
});

module.exports = router;
