const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'quiz.db';

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to database');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            userId INTEGER PRIMARY KEY,
            username TEXT UNIQUE,
            password TEXT
            )`, (err) => {
            if (err) {
                console.log(err.message);
            }
        });
        db.run(`CREATE TABLE IF NOT EXISTS testResults (
            testId INTEGER PRIMARY KEY,
            userId INTEGER,
            operation TEXT,
            difficulty TEXT,
            timeStamp  TEXT,
            score  INTEGER
            )`, (err) => {
            if (err) {
                console.log(err.message)
            }
        });
    }
})

module.exports = db;