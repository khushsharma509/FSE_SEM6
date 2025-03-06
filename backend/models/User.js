const db = require("../config/db");

class User {
    static createUser(name, email, password, callback) {
        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(sql, [name, email, password], callback);
    }

    static getAllUsers(callback) {
        const sql = "SELECT * FROM users";
        db.query(sql, callback);
    }
}

module.exports = User;
