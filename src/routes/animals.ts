import { Router } from 'express';
import { addAnimal, deleteAnimal, getAnimals, updateAnimal } from '../db/queries/animalQueries';
import {
  CreateAnimalVerification,
  DeleteAnimalVerification,
  UpdateAnimalVerification,
} from '../web/constants/AnimalVerification';

export const animalsRouter = Router();

// GET all animals
animalsRouter.get('/animal/', async (_req, res) => {
  const animals = await getAnimals();
  res.json(animals);
});

// POST a new animal
animalsRouter.post('/animal/', async (req, res) => {
  const { tag, breed, birth_date } = req.body;
  if (!tag) {
    return res.status(400).json(CreateAnimalVerification.tagNotDefined);
  }
  try {
    const [newAnimal] = await addAnimal(tag, breed, birth_date);

    res.status(201).json(newAnimal);
  } catch (err) {
    res.status(500).json(CreateAnimalVerification.failedCreateAnimal(tag));
  }
});

// PUT update an animal by ID
animalsRouter.put('/animal/:id', async (req, res) => {
  const { id } = req.params;
  const { tag, breed, birth_date } = req.body;

  if (!id) {
    return res.status(400).json(UpdateAnimalVerification.animalIdNotDefined);
  }

  const parsedId = Number(id);
  if (!parsedId) {
    return res.status(400).json(UpdateAnimalVerification.animalIdNotNumber);
  }

  try {
    const result = await updateAnimal(parsedId, tag, breed, birth_date);

    if (result.length === 0) {
      return res.status(404).json(UpdateAnimalVerification.animalIdNotFound(parsedId));
    }

    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json(UpdateAnimalVerification.updateUnsuccessful(parsedId));
  }
});

// DELETE an animal by ID
animalsRouter.delete('/animal/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json(DeleteAnimalVerification.animalIdNotDefined);
  }

  const parsedId = Number(id);
  if (!parsedId) {
    return res.status(400).json(DeleteAnimalVerification.animalIdNotNumber);
  }

  try {
    const result = await deleteAnimal(parsedId);

    if (result.changes === 0) {
      return res.status(404).json();
    }

    res.status(200).json(DeleteAnimalVerification.deleteSuccessful(parsedId));
  } catch (err) {
    res.status(500).json(DeleteAnimalVerification.deleteUnsuccessful(parsedId));
  }
});
