const db = require("../config/db");

class Order {
    static createOrder(user_id, total_price, callback) {
        const sql = "INSERT INTO orders (user_id, total_price) VALUES (?, ?)";
        db.query(sql, [user_id, total_price], callback);
    }

    static addOrderItems(orderId, products, callback) {
        const sql = "INSERT INTO order_items (order_id, product_id, quantity) VALUES ?";
        const orderItems = products.map(product => [orderId, product.product_id, product.quantity]);
        db.query(sql, [orderItems], callback);
    }

    static getAllOrders(callback) {
        const sql = `
            SELECT o.order_id, o.user_id, o.total_price, o.created_at, 
                   oi.product_id, oi.quantity, p.name AS product_name, p.price
            FROM orders o
            JOIN order_items oi ON o.order_id = oi.order_id
            JOIN products p ON oi.product_id = p.product_id
        `;
        db.query(sql, callback);
    }

    static getOrderById(orderId, callback) {
        const sql = `
            SELECT o.order_id, o.user_id, o.total_price, o.created_at, 
                   oi.product_id, oi.quantity, p.name AS product_name, p.price
            FROM orders o
            JOIN order_items oi ON o.order_id = oi.order_id
            JOIN products p ON oi.product_id = p.product_id
            WHERE o.order_id = ?
        `;
        db.query(sql, [orderId], callback);
    }

    static updateOrder(orderId, total_price, status, callback) {
        const sql = "UPDATE orders SET total_price=?, status=? WHERE order_id=?";
        db.query(sql, [total_price, status, orderId], callback);
    }

    static deleteOrder(orderId, callback) {
        db.query("DELETE FROM order_items WHERE order_id = ?", [orderId], (err) => {
            if (err) return callback(err);
            db.query("DELETE FROM orders WHERE order_id = ?", [orderId], callback);
        });
    }
}

module.exports = Order;
