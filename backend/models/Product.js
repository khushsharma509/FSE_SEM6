const db = require("../config/db");

class Product {
    static create({ name, description, price, stock }) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)";
            db.query(sql, [name, description, price, stock], (err, result) => {
                if (err) reject(err);
                resolve(result.insertId);
            });
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM products", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM products WHERE product_id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0] || null);
            });
        });
    }

    static update(id, { name, description, price, stock }) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE products SET name=?, description=?, price=?, stock=? WHERE product_id=?";
            db.query(sql, [name, description, price, stock, id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM products WHERE product_id = ?", [id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = Product;
