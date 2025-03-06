const OrderItem = require("../models/OrderItem");

exports.addOrderItem = (req, res) => {
    const { order_id, product_id, quantity, price } = req.body;

    if (!order_id || !product_id || !quantity || !price) {
        return res.status(400).json({ error: "All fields (order_id, product_id, quantity, price) are required." });
    }

    OrderItem.addOrderItem(order_id, product_id, quantity, price, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error: " + err.message });
        res.status(201).json({ message: "Order item added successfully", order_item_id: result.insertId });
    });
};

exports.getAllOrderItems = (req, res) => {
    OrderItem.getAllOrderItems((err, results) => {
        if (err) return res.status(500).json({ error: "Database error: " + err.message });
        res.json(results);
    });
};

exports.getOrderItemById = (req, res) => {
    const order_item_id = req.params.id;

    OrderItem.getOrderItemById(order_item_id, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error: " + err.message });
        if (result.length === 0) return res.status(404).json({ error: "Order item not found." });
        res.json(result[0]);
    });
};

exports.updateOrderItem = (req, res) => {
    const order_item_id = req.params.id;
    const { order_id, product_id, quantity, price } = req.body;

    if (!order_id || !product_id || !quantity || !price) {
        return res.status(400).json({ error: "All fields (order_id, product_id, quantity, price) are required." });
    }

    OrderItem.updateOrderItem(order_item_id, order_id, product_id, quantity, price, (err) => {
        if (err) return res.status(500).json({ error: "Database error: " + err.message });
        res.json({ message: "Order item updated successfully." });
    });
};

exports.deleteOrderItem = (req, res) => {
    const order_item_id = req.params.id;

    OrderItem.deleteOrderItem(order_item_id, (err) => {
        if (err) return res.status(500).json({ error: "Database error: " + err.message });
        res.json({ message: "Order item deleted successfully." });
    });
};
