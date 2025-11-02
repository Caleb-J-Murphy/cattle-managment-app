// src/routes/__tests__/animals.test.ts
import express from 'express';
import request from 'supertest';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  CreateAnimalVerification,
  DeleteAnimalVerification,
  UpdateAnimalVerification,
} from '../../constants/AnimalVerification';
import * as animalQueries from '../../db/queries/animalQueries';
import { animalsRouter } from '../animals';

const app = express();
app.use(express.json());
app.use('/api/animals', animalsRouter);

// Mock database functions
vi.mock('../../db/queries/animalQueries');

describe('GET /api/animals', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns all animals when the DB has data', async () => {
    const mockAnimals = [
      { id: 1, tag: 'A1', breed: 'Angus', birth_date: '2020-01-01' },
      { id: 2, tag: 'B2', breed: 'Hereford', birth_date: '2021-05-01' },
    ];

    (animalQueries.getAnimals as any).mockResolvedValue(mockAnimals);

    const res = await request(app).get('/api/animals');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockAnimals);
  });

  it('returns an empty array when there are no animals', async () => {
    (animalQueries.getAnimals as any).mockResolvedValue([]);

    const res = await request(app).get('/api/animals');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('returns a 500 error if the DB throws an error', async () => {
    (animalQueries.getAnimals as any).mockRejectedValue(new Error('DB error'));

    // Since your current route does not catch errors, Express will return 500 automatically
    const res = await request(app).get('/api/animals');

    expect(res.status).toBe(500);
  });
});

describe('POST /api/animals', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('creates a new animal when all fields are valid', async () => {
    const newAnimal = { id: 1, tag: 'A1', breed: 'Angus', birth_date: '2020-01-01' };
    (animalQueries.addAnimal as any).mockResolvedValue([newAnimal]);

    const res = await request(app)
      .post('/api/animals')
      .send({ tag: 'A1', breed: 'Angus', birth_date: '2020-01-01' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(newAnimal);
  });

  it('returns 400 if tag is missing', async () => {
    const res = await request(app)
      .post('/api/animals')
      .send({ breed: 'Angus', birth_date: '2020-01-01' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual(CreateAnimalVerification.tagNotDefined);
  });

  it('returns 500 if the database call fails', async () => {
    (animalQueries.addAnimal as any).mockRejectedValue(new Error('DB failed'));

    const res = await request(app)
      .post('/api/animals')
      .send({ tag: 'B2', breed: 'Hereford', birth_date: '2021-05-01' });

    expect(res.status).toBe(500);
    expect(res.body).toEqual(CreateAnimalVerification.failedCreateAnimal('B2'));
  });
});

describe('PUT /api/animals/:animalId', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 if animalId is not a number', async () => {
    const res = await request(app).put('/api/animals/abc').send({ tag: 'A1' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual(UpdateAnimalVerification.animalIdNotNumber);
  });

  it('returns 404 if animal ID does not exist', async () => {
    (animalQueries.updateAnimal as any).mockResolvedValue([]);

    const res = await request(app).put('/api/animals/999').send({
      tag: 'A1',
      breed: 'Angus',
      birth_date: '2020-01-01',
    });

    expect(res.status).toBe(404);
    expect(res.body).toEqual(UpdateAnimalVerification.animalIdNotFound(999));
  });

  it('returns 200 with updated animal on success', async () => {
    const updatedAnimal = { id: 1, tag: 'A1', breed: 'Angus', birth_date: '2020-02-02' };
    (animalQueries.updateAnimal as any).mockResolvedValue([updatedAnimal]);

    const res = await request(app).put('/api/animals/1').send({
      tag: 'A1',
      breed: 'Angus',
      birth_date: '2020-02-02',
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedAnimal);
  });

  it('returns 500 if database call fails', async () => {
    (animalQueries.updateAnimal as any).mockRejectedValue(new Error('DB failed'));

    const res = await request(app).put('/api/animals/1').send({
      tag: 'A1',
      breed: 'Angus',
      birth_date: '2020-02-02',
    });

    expect(res.status).toBe(500);
    expect(res.body).toEqual(UpdateAnimalVerification.updateUnsuccessful(1));
  });
});

describe('DELETE /api/animals/:animalId', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 if animalId is not a number', async () => {
    const res = await request(app).delete('/api/animals/abc');

    expect(res.status).toBe(400);
    expect(res.body).toEqual(DeleteAnimalVerification.animalIdNotNumber);
  });

  it('returns 404 if animal does not exist', async () => {
    (animalQueries.deleteAnimal as any).mockResolvedValue({ changes: 0 });

    const res = await request(app).delete('/api/animals/999');

    expect(res.status).toBe(404);
  });

  it('returns 200 if animal is deleted successfully', async () => {
    (animalQueries.deleteAnimal as any).mockResolvedValue({ changes: 1 });

    const res = await request(app).delete('/api/animals/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(DeleteAnimalVerification.deleteSuccessful(1));
  });

  it('returns 404 if animal is does not exist', async () => {
    (animalQueries.deleteAnimal as any).mockResolvedValue({ changes: 0 });

    const res = await request(app).delete('/api/animals/999');

    expect(res.status).toBe(404);
    expect(res.body).toEqual(DeleteAnimalVerification.animalNotFound(999));
  });

  it('returns 500 if database call fails', async () => {
    (animalQueries.deleteAnimal as any).mockRejectedValue(new Error('DB failed'));

    const res = await request(app).delete('/api/animals/1');

    expect(res.status).toBe(500);
    expect(res.body).toEqual(DeleteAnimalVerification.deleteUnsuccessful(1));
  });
});
