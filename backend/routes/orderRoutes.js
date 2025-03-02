const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Create a new order
router.post("/", (req, res) => {
    const { user_id, products, total_price } = req.body;

    if (!user_id || !products || !total_price) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Insert order into the orders table
    const sqlOrder = "INSERT INTO orders (user_id, total_price) VALUES (?, ?)";
    db.query(sqlOrder, [user_id, total_price], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }

        const orderId = result.insertId;

        // Insert products into order_items table
        const sqlOrderItems = "INSERT INTO order_items (order_id, product_id, quantity) VALUES ?";
        const orderItems = products.map(product => [orderId, product.product_id, product.quantity]);

        db.query(sqlOrderItems, [orderItems], (err) => {
            if (err) {
                return res.status(500).json({ error: "Database error: " + err.message });
            }
            res.status(201).json({ message: "Order placed successfully", orderId });
        });
    });
});

// Get all orders with products
router.get("/", (req, res) => {
    const sql = `
        SELECT o.order_id, o.user_id, o.total_price, o.created_at, 
               oi.product_id, oi.quantity, p.name AS product_name, p.price
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.json(results);
    });
});

// Get a single order by ID
router.get("/:id", (req, res) => {
    const orderId = req.params.id;

    const sql = `
        SELECT o.order_id, o.user_id, o.total_price, o.created_at, 
               oi.product_id, oi.quantity, p.name AS product_name, p.price
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.order_id = ?
    `;

    db.query(sql, [orderId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(results);
    });
});

// Update an order
router.put("/:id", (req, res) => {
    const orderId = req.params.id;
    const { total_price, status } = req.body;

    const sql = "UPDATE orders SET total_price=?, status=? WHERE order_id=?";
    db.query(sql, [total_price, status, orderId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.json({ message: "Order updated successfully" });
    });
});

// Delete an order
router.delete("/:id", (req, res) => {
    const orderId = req.params.id;

    // First, delete related products from order_items
    db.query("DELETE FROM order_items WHERE order_id = ?", [orderId], (err) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }

        // Then delete the order
        db.query("DELETE FROM orders WHERE order_id = ?", [orderId], (err) => {
            if (err) {
                return res.status(500).json({ error: "Database error: " + err.message });
            }
            res.json({ message: "Order deleted successfully" });
        });
    });
});

module.exports = router;
