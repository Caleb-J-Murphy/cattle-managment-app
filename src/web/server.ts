/* eslint-disable no-console */
import '../db/index.js';

import Database from 'better-sqlite3';
import bodyParser from 'body-parser';
import cors from 'cors';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import express from 'express';
import { AnimalVerification } from './constants.js';

// --------------------
// Setup SQLite + Drizzle
// --------------------
const sqlite = new Database('./livestock.db');
export const db = drizzle(sqlite);

// --------------------
// Define tables
// --------------------

export const animalsTable = sqliteTable('animals', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  tag_number: text('tag_number').notNull(),
  breed: text('breed'),
  birth_date: text('birth_date'),
});

// --------------------
// Express app setup
// --------------------
const app = express();
app.use(cors());
app.use(bodyParser.json());

// --------------------
// Routes
// --------------------

app.get('/', (_req, res) => {
  res.send('Cattle Management API is running');
});

// GET all animals
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/api/animals', async (req, res) => {
  const animals = await db.select().from(animalsTable).all();
  res.json(animals);
});

// POST a new animal
app.post('/api/animals', async (req, res) => {
  const { tag_number, breed, birth_date } = req.body;
  if (!tag_number) {
    return res.status(400).json(AnimalVerification.tagNotDefined);
  }

  const [newAnimal] = await db
    .insert(animalsTable)
    .values({ tag_number, breed, birth_date })
    .returning();

  res.status(201).json(newAnimal);
});

// --------------------
// Start server
// --------------------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
