const express = require("express");
const router = express.Router();

module.exports = function(db) {
    router.get('/profile', (req, res) => {
        const userID = req.session.user.user_id;

        const selectQuery = "SELECT * FROM User WHERE user_id = ?";
        
        db.query(selectQuery, [userID], (error, result) => {
            if (error) {
                console.error("Database Server Down!");
                return res.status(500).json({ err: "Database Server Down!" });
            }
            if (result.length > 0) {
                const user = result[0];
                const totalGames = user.num_win + user.num_lose + user.num_draw;
                const winRate = totalGames > 0 ? Math.round((user.num_win / totalGames) * 100) : 0;
                const loseRate = totalGames > 0 ? Math.round((user.num_lose / totalGames) * 100) : 0;
                const drawRate = totalGames > 0 ? Math.round((user.num_draw / totalGames) * 100) : 0;

                res.render('profile', { user, winRate, loseRate, drawRate});
            } 
        });
    });   
    return router;
};