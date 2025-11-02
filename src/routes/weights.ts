import express from 'express';
import { addWeightForAnimal, getWeightsForAnimal } from '../db/queries/weightQueries';
import {
  CreateWeightVerification,
  GetWeightVerification,
} from '../web/constants/WeightVerification';

export const weightsRouter = express.Router();

// GET all weights for a specific animal
weightsRouter.get('/weight/:animalId', async (req, res) => {
  const { animalId } = req.params;
  const parsedId = Number(animalId);
  if (isNaN(parsedId)) {
    return res.status(400).json(GetWeightVerification.animalIdNotNumber);
  }
  try {
    const weights = await getWeightsForAnimal(parsedId);

    if (weights.length === 0) {
      return res.status(404).json(GetWeightVerification.noWeightsFound);
    }

    res.json(weights);
  } catch (err) {
    res.status(500).json(GetWeightVerification.failedGetWeights(parsedId));
  }
});

// POST create a new weight for an animal
weightsRouter.post('/weight/', async (req, res) => {
  const { animalId, weightDate, weightValueKg } = req.body;
  const parsedId = Number(animalId);
  if (isNaN(parsedId)) {
    return res.status(400).json(GetWeightVerification.animalIdNotNumber);
  }
  if (!parsedId) {
    return res.status(400).json(CreateWeightVerification.animalIdNotDefined);
  }
  if (!weightDate) {
    return res.status(400).json(CreateWeightVerification.weightDateNotDefined);
  }
  if (!weightValueKg) {
    return res.status(400).json(CreateWeightVerification.weightValueNotDefined);
  }
  try {
    const [newWeight] = await addWeightForAnimal(parsedId, weightDate, weightValueKg);
    res.status(201).json(newWeight);
  } catch (err) {
    res.status(500).json(CreateWeightVerification.failedCreateWeight(parsedId));
  }
});
