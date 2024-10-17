const express = require("express");
const router = express.Router();

module.exports = function(db) {

    router.post('/register', (req, res) => {
        const { user_id, user_email, user_password, confirm_password } = req.body;

        // Check if the password and confirm password match
        if (user_password !== confirm_password) {
            return res.status(400).json({ error: "password_mismatch", field: "confirm-password", message: "Passwords do not match" });
        }

        // Query to check if user ID or email already exists
        const checkUserQuery = 'SELECT * FROM User WHERE user_id = ? OR email = ?';

        db.query(checkUserQuery, [user_id, user_email], (err, result) => {
            if (err) {
                console.error("Database query error: ", err);
                return res.status(500).json({ error: 'database_error' });
            }

            // Initialize flags to check existence
            let userIdExists = false;
            let emailExists = false;

            // Iterate through results to check for existing user ID and email
            result.forEach(user => {
                if (user.user_id === user_id) {
                    userIdExists = true; // User ID exists
                }
                if (user.email === user_email) {
                    emailExists = true; // Email exists
                }
            });

            // Return appropriate error messages based on flags
            if (userIdExists) {
                return res.status(400).json({ error: 'user_id_exists', field: "user-id", message: "User ID is already taken" });
            }
            if (emailExists) {
                return res.status(400).json({ error: 'email_exists', field: "user-email", message: "Email is already registered" });
            }

            // Insert new user if no duplicate found
            const insertUserQuery = 'INSERT INTO User (user_id, email, password) VALUES (?, ?, ?)';

            db.query(insertUserQuery, [user_id, user_email, user_password], (err, result) => {

                if (err) {
                    console.error("Error inserting user:", err);
                    return res.status(500).send("Server error");
                }

                // Redirect to login page after successful registration
                res.redirect("/login");
            });
        });
    });

    return router;
};