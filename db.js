// db.js
const Database = require("better-sqlite3");
const db = new Database("users.db");

// Create table if it doesn't exist
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )
`
).run();

module.exports = db;
