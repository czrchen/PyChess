const express = require("express");
const routes = express.Router();

module.exports = (db) => {

    // Login POST route
    routes.post('/login', (req, res) => {
        const { user_id, user_password } = req.body;

        if (user_id && user_password) {
            // Query to check if the user exists by email
            db.query('SELECT * FROM User WHERE user_id = ? AND password = ?', [user_id,user_password], (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: 'Server Down! '});
                }

                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.user = results[0];
                    return res.status(200).json({ success: true });
                } else {
                    // Passwords don't match
                    return res.status(400).json({ error: 'Incorrect User ID or Password! ', 
                        field: "password", message: "Incorrect Credentials! " });
                }
            });

        }else {
            // If user_id or user_password are missing
            return res.status(400).json({ error: 'All fields are required! '});
        }
    });

    routes.get('/logout', (req, res) => {
        if (req.session) {
            // Destroy the session
            req.session.destroy((err) => {
                if (err) {
                    console.error(err);
                    return next(err);
                } else {
                    return res.redirect('/login');
                }
            });
        }
    });

    return routes;
};
