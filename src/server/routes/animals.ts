import { Router } from 'express';
import {
  CreateAnimalVerification as CreateVerif,
  DeleteAnimalVerification as DeleteVerif,
  UpdateAnimalVerification as UpdateVerif,
} from '../constants/AnimalVerification.js';
import { addAnimal, deleteAnimal, getAnimals, updateAnimal } from '../db/queries/animalQueries.js';

export const animalsRouter = Router();

// GET all animals
animalsRouter.get(`/`, async (_req, res) => {
  const animals = await getAnimals();
  res.json(animals);
});

// POST a new animal
animalsRouter.post(`/`, async (req, res) => {
  const { tag, breed, birth_date } = req.body;
  if (!tag) {
    return res.status(400).json(CreateVerif.tagNotDefined);
  }
  try {
    const [newAnimal] = await addAnimal(tag, breed, birth_date);

    res.status(201).json(newAnimal);
  } catch (err) {
    res.status(500).json(CreateVerif.failedCreateAnimal(tag));
  }
});

// PUT update an animal by ID
animalsRouter.put(`/:animalId`, async (req, res) => {
  const { animalId } = req.params;
  const { tag, breed, birth_date } = req.body;

  const parsedId = Number(animalId);
  if (!parsedId) {
    return res.status(400).json(UpdateVerif.animalIdNotNumber);
  }

  try {
    const result = await updateAnimal(parsedId, tag, breed, birth_date);

    if (result.length === 0) {
      return res.status(404).json(UpdateVerif.animalIdNotFound(parsedId));
    }

    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json(UpdateVerif.updateUnsuccessful(parsedId));
  }
});

// DELETE an animal by ID
animalsRouter.delete(`/:animalId`, async (req, res) => {
  const { animalId } = req.params;

  const parsedId = Number(animalId);
  if (isNaN(parsedId)) {
    return res.status(400).json(DeleteVerif.animalIdNotNumber);
  }

  try {
    const result = await deleteAnimal(parsedId);

    if (result.changes === 0) {
      return res.status(404).json(DeleteVerif.animalNotFound(parsedId));
    }

    res.status(200).json(DeleteVerif.deleteSuccessful(parsedId));
  } catch (err) {
    res.status(500).json(DeleteVerif.deleteUnsuccessful(parsedId));
  }
});
