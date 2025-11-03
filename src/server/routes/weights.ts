import express from 'express';
import {
  CreateWeightVerification,
  DeleteWeightVerification,
  GetWeightVerification,
  UpdateWeightVerification,
} from '../constants/WeightVerification.ts';
import {
  addWeight,
  deleteWeight,
  getWeight,
  getWeightsForAnimal,
  updateWeight,
} from '../db/queries/weightQueries.ts';

export const weightsRouter = express.Router();

// TODO create route to get all weights

// GET all weights for a specific animal
weightsRouter.get(`/animal/:animalId`, async (req, res) => {
  const { animalId } = req.params;
  const parsedId = Number(animalId);
  if (isNaN(parsedId)) {
    return res.status(400).json(GetWeightVerification.animalIdNotNumber);
  }
  try {
    const weights = await getWeightsForAnimal(parsedId);

    if (weights.length === 0) {
      return res.status(404).json(GetWeightVerification.noWeightsFoundForAnimal(parsedId));
    }

    res.json(weights);
  } catch (err) {
    res.status(500).json(GetWeightVerification.failedGetWeightsForAnimal(parsedId));
  }
});

// GET a specific weight by weight ID
weightsRouter.get(`/:weightId`, async (req, res) => {
  const { weightId } = req.params;
  const parsedId = Number(weightId);

  if (!parsedId) {
    return res.status(400).json(GetWeightVerification.weightIdNotNumber);
  }

  try {
    const weight = await getWeight(parsedId);

    if (!weight) {
      return res.status(404).json(GetWeightVerification.weightNotFound(parsedId));
    }

    res.json(weight);
  } catch (err) {
    res.status(500).json(GetWeightVerification.failedGetWeight(parsedId));
  }
});

// POST create a new weight for an animal
weightsRouter.post(`/`, async (req, res) => {
  const { animal_id, weight_date, weight_value_kg } = req.body;
  const parsedId = Number(animal_id);
  if (!parsedId) {
    return res.status(400).json({ error: `Animal ID is not defined: ${animal_id}` });
  }
  if (!weight_date) {
    return res.status(400).json(CreateWeightVerification.weightDateNotDefined);
  }
  if (!weight_value_kg) {
    return res.status(400).json(CreateWeightVerification.weightValueNotDefined);
  }
  try {
    const [newWeight] = await addWeight(parsedId, weight_date, weight_value_kg);
    res.status(201).json(newWeight);
  } catch (err) {
    res.status(500).json(CreateWeightVerification.failedCreateWeight(parsedId));
  }
});

// PUT update a weight by ID
weightsRouter.put(`/:weightId`, async (req, res) => {
  const { weightId } = req.params;
  const { animal_Id, weight_date, weight_value_kg } = req.body;

  if (!weightId) {
    return res.status(400).json(UpdateWeightVerification.weightIdNotDefined);
  }

  const parsedId = Number(weightId);
  if (!parsedId) {
    return res.status(400).json(UpdateWeightVerification.weightIdNotDefined);
  }

  try {
    const result = await updateWeight(parsedId, animal_Id, weight_date, weight_value_kg);

    if (result.length === 0) {
      return res.status(404).json(UpdateWeightVerification.weightIdNotFound(parsedId));
    }

    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json(UpdateWeightVerification.updateUnsuccessful(parsedId));
  }
});

// DELETE a weight by ID
weightsRouter.delete(`/:weightId`, async (req, res) => {
  const { weightId } = req.params;

  if (!weightId) {
    return res.status(400).json(DeleteWeightVerification.weightIdNotDefined);
  }

  const parsedId = Number(weightId);
  if (!parsedId) {
    return res.status(400).json(DeleteWeightVerification.weightIdNotNumber);
  }

  try {
    const result = await deleteWeight(parsedId);

    if (result.changes === 0) {
      return res.status(404).json();
    }

    res.status(200).json(DeleteWeightVerification.deleteSuccessful(parsedId));
  } catch (err) {
    res.status(500).json(DeleteWeightVerification.deleteUnsuccessful(parsedId));
  }
});
