const express = require('express');
const router = express.Router();

// Function to generate a random string
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

module.exports = (db) => {

    router.get('/generate-session-id', (req, res) => {
        let sessionId;

        const checkSessionIdExists = (sessionId, callback) => {
            db.query('SELECT * FROM Game_Session WHERE session_id = ?', [sessionId], (err, results) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, results.length > 0); // Return true if the session ID exists
                }
            });
        };

        const findUniqueSessionId = () => {
            sessionId = generateRandomString(6);
            checkSessionIdExists(sessionId, (err, exists) => {
                if (err) {
                    return res.json({ success: false, message: 'Error checking session ID.' });
                }

                if (exists) { // Limit attempts to prevent infinite loop
                    findUniqueSessionId(); // Recursively find a new session ID
                } 
                else {
                    // Insert into the database (if a unique ID is found)
                    db.query('INSERT INTO Game_Session (Session_Id) VALUES (?)', [sessionId], (err) => {
                        if (err) {
                            return res.json({ success: false, message: 'Error inserting session ID.' });
                        }
                        res.json({ success: true, sessionId }); // Return the unique session ID
                    });
                }
            });
        };

        findUniqueSessionId();
    });
    return router;
};
