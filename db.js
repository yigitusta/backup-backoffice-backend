const mysql = require("mysql");

const db = mysql.createConnection({
  host: "134.209.255.147",
  user: "root",
  password: "hIhdQk7WN269vgNGtb88",
  database: "stellar"
});

module.exports = db;