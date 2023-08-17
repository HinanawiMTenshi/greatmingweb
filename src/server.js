
 
const cors = require('cors');

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.set('trust proxy', 1);
app.use(cors({
    origin: 'http://localhost:3001'
  }));
  
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow any origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Hinanawi4462',
  database: 'gmw'
});

db.connect();

// Fetch all user details
app.get('/users', (req, res) => {
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
