/* eslint-disable no-console */
import './db/index.js';

import Database from 'better-sqlite3';
import bodyParser from 'body-parser';
import cors from 'cors';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import express from 'express';
import { ANIMAL_ROUTE, animalsRouter } from './routes/animals.js';
import { vaccinationsRouter } from './routes/vaccinations.js';
import { WEIGHT_ROUTE, weightsRouter } from './routes/weights.js';

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

app.use(`/api${ANIMAL_ROUTE}`, animalsRouter);
app.use(`/api${WEIGHT_ROUTE}`, weightsRouter);
app.use('/api/vaccinations', vaccinationsRouter);

// --------------------
// Start server
// --------------------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
