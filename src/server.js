
 
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

// 原版数据库连接
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'GreatMingWeb'
});

// // Docker镜像的数据库链接(使用本地数据库而不是数据库镜像)
// const dbConfig = {
//     host: process.env.DB_HOST || '127.0.0.1',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '123456',
//     database: process.env.DB_NAME || 'GreatMingWeb',
// };
//
// const db = mysql.createConnection(dbConfig)

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

app.post('/register', (req, res) => {
    const { username, tag, ranks, company, kills, attendance, balance, password , enrollmentTime} = req.body;

    // 在此处添加逻辑来验证用户输入，例如检查用户名是否已存在等。

    // 将用户信息插入数据库或执行其他必要的注册逻辑。
    const insertQuery = 'INSERT INTO users (username, tag, ranks, company, kills, attendance, balance, password, enrollmentTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(
        insertQuery,
        [username, tag, ranks, company, kills, attendance, balance, password, enrollmentTime],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: '注册时发生错误' });
            } else {
                res.status(200).json({ message: '注册成功' });
            }
        }
    );
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
