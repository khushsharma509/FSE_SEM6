const Order = require("../models/Order");

exports.createOrder = (req, res) => {
    const { user_id, products, total_price } = req.body;

    if (!user_id || !products || !total_price) {
        return res.status(400).json({ error: "All fields are required" });
    }

    Order.createOrder(user_id, total_price, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error: " + err.message });

        const orderId = result.insertId;
        Order.addOrderItems(orderId, products, (err) => {
            if (err) return res.status(500).json({ error: "Database error: " + err.message });
            res.status(201).json({ message: "Order placed successfully", orderId });
        });
    });
};

exports.getAllOrders = (req, res) => {
    Order.getAllOrders((err, results) => {
        if (err) return res.status(500).json({ error: "Database error: " + err.message });
        res.json(results);
    });
};

exports.getOrderById = (req, res) => {
    const orderId = req.params.id;

    Order.getOrderById(orderId, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error: " + err.message });
        if (results.length === 0) return res.status(404).json({ error: "Order not found" });
        res.json(results);
    });
};

exports.updateOrder = (req, res) => {
    const orderId = req.params.id;
    const { total_price, status } = req.body;

    Order.updateOrder(orderId, total_price, status, (err) => {
        if (err) return res.status(500).json({ error: "Database error: " + err.message });
        res.json({ message: "Order updated successfully" });
    });
};

exports.deleteOrder = (req, res) => {
    const orderId = req.params.id;

    Order.deleteOrder(orderId, (err) => {
        if (err) return res.status(500).json({ error: "Database error: " + err.message });
        res.json({ message: "Order deleted successfully" });
    });
};
