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
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS animals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tag TEXT NOT NULL UNIQUE,
  breed TEXT,
  birth_date TEXT,
  sex TEXT,
  sire_id INTEGER,
  dam_id INTEGER,
  FOREIGN KEY (sire_id) REFERENCES animals(id),
  FOREIGN KEY (dam_id) REFERENCES animals(id)
);

CREATE TABLE IF NOT EXISTS weights (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  animal_id INTEGER NOT NULL,
  weight_date TEXT NOT NULL,
  weight_value_kg REAL NOT NULL,
  FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_weights_animal_id ON weights(animal_id);
`);

// Now create the Drizzle ORM instance
export const db = drizzle(connection);

// Use Drizzle queries as normal
// ...
