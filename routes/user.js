// will contain all user related routes
const express = require('express');
const mysql = require('mysql');
const router = express.Router();
router.get('/messages', (req, res) => {
    console.log("show messages");
    res.end();
});

router.get("/users", (req, res) => {
    const connection = getConnection();

    const queryString = "SELECT * FROM users";
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for users: " + err);
            res.sendStatus(500);
            return;
        }
        console.log("fetched users successfully");

        res.json(rows);
    });
});

router.get("/user/:id", (req, res) => {
    console.log("fetching user with id: " + req.params.id);

    const connection = getConnection();

    const userId = req.params.id;
    const queryString = "SELECT * FROM users WHERE id = ?";
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for users: " + err);
            res.sendStatus(500);
            return;
        }
        console.log("fetched users successfully");

        const users = rows.map((row) => {
            return {firstName: row.first_name, lastName: row.last_name};
        });
        res.json(users);
    });
    
});

router.post('/user_create', (req, res) => {
    console.log("Creating new user...");

    const firstName = req.body.create_first_name;
    const lastName = req.body.create_last_name;

    const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)";
    getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert new user: " + err);
            res.sendStatus(500);
            return;
        }
        console.log("Inserted a new user with id: ", results.insertId);
        res.end();
    });
});

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b90b80f62a670c',
    password: '4d093d04',
    database: 'heroku_c7222b72b0b9ba2'
});

function getConnection() {
    return pool;
}

module.exports = router;