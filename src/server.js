
 
const cors = require('cors');

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//Cors setting for local test. 
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
  password: '123456',
  database: 'GreatMingWeb'
});

db.connect();

app.use('/login', (req, res) => {
    //console.log(req.body.password);


    let updateQuery = 'SELECT users.password FROM users WHERE username = ? ';
    db.query(updateQuery, [req.body.username], (err, result) => {
        //res.json(result);
        //Cheak if the password match. Also aware about if the result of the query is nothing.
        if(result != ""){
            if (req.body.password==result[0].password){
                res.send({
                token: 'pass',
                user: {
                    username: req.body.username
                    // Add other user data you want to send back here
                }
                });
            }
            else{
                res.send({
                    token: 'denied'
                });
            }
        }
        if(err) throw err;
        });



    });


    app.get('/products', (req, res) => {
        //console.log("Fetching details for:", req.params.username);
        db.query('SELECT * FROM product', (err, results) => {
            if(err) throw err;
            res.json(results);
            
        });
    });

// Fetch all user details
app.get('/users/:username', (req, res) => {
    console.log("Fetching details for:", req.params.username);
    db.query('SELECT * FROM users WHERE username = ?', [req.params.username], (err, results) => {
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
