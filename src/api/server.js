const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Hinanawi4462',
  database: 'gmw'
});

db.connect();

// Fetch all user details
app.get('http://localhost:3000/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if(err) throw err;
        res.json(results);
    });
});

// Update user details (this is just a sample for username)
app.put('/users/:id', (req, res) => {
    let updateQuery = 'UPDATE users SET username = ? WHERE id = ?';
    db.query(updateQuery, [req.body.username, req.params.id], (err, result) => {
        if(err) throw err;
        res.json({message: 'User updated successfully'});
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
