const db = require("../config/db");

class OrderItem {
    static addOrderItem(order_id, product_id, quantity, price, callback) {
        const sql = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
        db.query(sql, [order_id, product_id, quantity, price], callback);
    }

    static getAllOrderItems(callback) {
        const sql = "SELECT * FROM order_items";
        db.query(sql, callback);
    }

    static getOrderItemById(order_item_id, callback) {
        const sql = "SELECT * FROM order_items WHERE order_item_id = ?";
        db.query(sql, [order_item_id], callback);
    }

    static updateOrderItem(order_item_id, order_id, product_id, quantity, price, callback) {
        const sql = "UPDATE order_items SET order_id=?, product_id=?, quantity=?, price=? WHERE order_item_id=?";
        db.query(sql, [order_id, product_id, quantity, price, order_item_id], callback);
    }

    static deleteOrderItem(order_item_id, callback) {
        const sql = "DELETE FROM order_items WHERE order_item_id = ?";
        db.query(sql, [order_item_id], callback);
    }
}

module.exports = OrderItem;
