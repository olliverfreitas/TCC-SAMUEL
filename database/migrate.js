const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, 'database.sqlite');
const schemaPath = path.join(__dirname, 'schema.sql');

const db = new Database(dbPath);
const schema = fs.readFileSync(schemaPath, 'utf8');

db.exec(schema);
db.close();

console.log('Migracao concluida:', dbPath);
