const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db.js');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const httpPort = 3000;

app.listen(httpPort, () => {
    console.log(`Server listening at port: ${httpPort}`);
});

app.get('/users', (req, res, next) => {
    let sql = 'SELECT * FROM users';
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'users': rows
        });
    });
});

app.get('/users/:id', (req, res, next) => {
    let sql = 'SELECT * FROM users WHERE userId = ?';
    let params = [req.params.id];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'users': rows
        });
    });
});

app.get('/users/username/:username', (req, res, next) => {
    let sql = 'SELECT * FROM users WHERE username = ?';
    let params = [req.params.username];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'users': rows
        });
    });
});

app.post('/users/', (req, res, next) => {
    let data = {
        username: req.body.username,
        password: req.body.password
    };
    let sql = 'INSERT INTO users (username, password) VALUES (?,?)'
    let params = [data.username, data.password];
    db.run(sql, params, (err, result) => {
        if (err){
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'users': data,
            'id': this.lastID
        });
    });
});

app.patch('/users/:id', (req, res, next) => {
    let data = {
        password: req.body.password
    };
    let sql = 'UPDATE users SET password = ? WHERE userId = ?';
    let params = [data.password, req.params.id];
    db.run(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'users': data,
            'id': this.lastID
        });
    });
});

app.delete('/users/:id', (req, res, next) => {
    let sql = 'DELETE FROM users WHERE userId = ?';
    let params = [req.params.id];
    db.run(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            rows: this.changes
        });
    });
});
app.get('/testResults/', (req,res,next) =>{
    let sql='select * from testResults '
    let params= [req.params.userId];
    db.all(sql,params,(err,rows) =>{
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'testResults':rows
        })
    } )
});

app.get('/testResults/:userId', (req,res,next) =>{
    let sql='SELECT * FROM testResults WHERE userId=?';
    let params= [req.params.userId];
    db.all(sql,params,(err,rows) =>{
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'testResults':rows
        });
    });
});

app.post('/testResults/', (req, res, next) => {
    let data = {
        userId: req.body.userId,
        operation: req.body.operation,
        difficulty: req.body.difficulty,
        timeStamp : req.body.timeStamp,
        score:  req.body.score
    };
    let sql = 'INSERT INTO testResults (userId,operation,difficulty,timeStamp,score) VALUES (?,?,?,?,?)';
    let params = [data.userId, data.operation, data.difficulty, data.timeStamp, data.score];
    db.run(sql, params, (err, result) => {
        if (err){
            res.status(400).json({'error': err.message});
            console.log(err.message)
            return;
        }
        res.json({
            'message': 'success',
            'testResults': data,
            'id': this.lastID
        });
    });
});



app.get('/', (req, res, next) => {
    res.json({'message': 'success'});
})