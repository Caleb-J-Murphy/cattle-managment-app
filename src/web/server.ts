/* eslint-disable no-console */
import '../db/index.js';

import Database from 'better-sqlite3';
import bodyParser from 'body-parser';
import cors from 'cors';
import { eq } from 'drizzle-orm';
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
app.get('/api/animals', async (_req, res) => {
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

// PUT update an animal by ID
app.put('/api/animals/:id', async (req, res) => {
  const { id } = req.params;
  const { tag_number, breed, birth_date } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Animal ID is required' });
  }

  try {
    const result = await db
      .update(animalsTable)
      .set({ tag_number, breed, birth_date })
      .where(eq(animalsTable.id, Number(id)))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: 'Animal not found' });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update animal' });
  }
});

// DELETE an animal by ID
app.delete('/api/animals/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Animal ID is required' });
  }

  try {
    const result = await db.delete(animalsTable).where(eq(animalsTable.id, Number(id)));

    // Drizzle's `.delete()` returns an object with number of rows deleted (depends on dialect)
    // So you can check it like this:
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Animal not found' });
    }

    res.status(200).json({ message: 'Animal deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete animal' });
  }
});

// --------------------
// Start server
// --------------------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
