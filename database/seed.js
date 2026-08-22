const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, 'database.sqlite');
const seedPath = path.join(__dirname, 'seed.sql');

const db = new Database(dbPath);
const seed = fs.readFileSync(seedPath, 'utf8');

db.exec(seed);
db.close();

console.log('Seed concluido:', dbPath);
