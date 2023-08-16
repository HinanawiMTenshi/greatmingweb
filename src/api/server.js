const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'your_database_name'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

app.get('/user/:id', (req, res) => {
  const sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put('/user/:id', (req, res) => {
    // Extract info from request body
    const { username, tag, rank, company, kills, attendance, balance, create_at } = req.body;
    
    // SQL Query to update the data. Make sure to protect against SQL injection.
    const sql = `UPDATE users SET username = ?, tag = ?, rank = ?, company = ?, kills = ?, attendance = ?, balance = ?, create_at = ? WHERE id = ?`;
    
    // Execute the query
    db.query(sql, [username, tag, rank, company, kills, attendance, balance, create_at, req.params.id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Server Error");
      } else {
        res.send({ message: 'Successfully updated user data!', data: result });
      }
    });
  });

// Additional routes for updating user info, changing profile picture, etc.

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
