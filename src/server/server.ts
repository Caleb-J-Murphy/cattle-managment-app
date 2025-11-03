/* eslint-disable no-console */
import './db/index.ts';

import Database from 'better-sqlite3';
import bodyParser from 'body-parser';
import cors from 'cors';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import express from 'express';
import { animalsRouter } from './routes/animals.ts';
import { vaccinationsRouter } from './routes/vaccinations.ts';
import { weightsRouter } from './routes/weights.ts';

// --------------------
// Setup SQLite + Drizzle
// --------------------
const sqlite = new Database('./livestock.db');
export const db = drizzle(sqlite);

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

app.use(`/api/animals`, animalsRouter);
app.use(`/api/weights`, weightsRouter);
app.use('/api/vaccinations', vaccinationsRouter);

// --------------------
// Start server
// --------------------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
