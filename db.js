const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aksh@Mysql2026#',
    database: 'blood_bank'
});

db.connect(err => {
    if (err) {
        console.log("❌ DB Connection Error:", err);
    } else {
        console.log("✅ Connected to MySQL database!");
    }
});

module.exports = db;

