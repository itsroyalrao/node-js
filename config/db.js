const mysql = require("mysql2");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'expense-tracker',
  password: 'Mohit@1234',
});

module.exports = pool.promise();
