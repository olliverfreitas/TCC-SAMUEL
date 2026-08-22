const path = require('path');
const Database = require('better-sqlite3');

const dbPath = process.env.DB_PATH
    ? path.resolve(process.cwd(), process.env.DB_PATH)
    : path.join(__dirname, '..', '..', 'database', 'database.sqlite');

const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

module.exports = db;
