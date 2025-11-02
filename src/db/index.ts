import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the db if it does not already exist, the name is custom and can be
// whatever we want
const dbFile = path.resolve(__dirname, '../../livestock.db');

const connection = new Database(dbFile);
// Create tables if they don't already exist
connection.exec(`
CREATE TABLE IF NOT EXISTS animals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tag_number TEXT NOT NULL,
  breed TEXT,
  birth_date TEXT,
  sex TEXT,
  sire_id INTEGER,
  dam_id INTEGER
);

CREATE TABLE IF NOT EXISTS weights (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  animal_id INTEGER NOT NULL,
  weight_date TEXT NOT NULL,
  weight_value_kg number NOT NULL,
);
`);

// Now create the Drizzle ORM instance
export const db = drizzle(connection);

// Use Drizzle queries as normal
// ...
