// db.js
const Database = require("better-sqlite3");
const db = new Database("applicants.db");

// Create the users table if it doesn't exist
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS applicants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL
  )
`
).run();

module.exports = db;
