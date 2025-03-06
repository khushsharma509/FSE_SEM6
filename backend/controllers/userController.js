const User = require("../models/User");

exports.createUser = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    User.createUser(name, email, password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.status(201).json({ message: "User created successfully", userId: result.insertId });
    });
};

exports.getAllUsers = (req, res) => {
    User.getAllUsers((err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.json(results);
    });
};
