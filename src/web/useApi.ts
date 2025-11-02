import { useAddAnimal, useAnimals, useDeleteAnimal, useUpdateAnimal } from './hooks/animals';
import {
  useAddWeightForAnimal,
  useDeleteWeight,
  useUpdateWeight,
  useWeightsForAnimal,
} from './hooks/weights';

export const API_BASE = 'http://localhost:3001/api';

export { useAnimals, useAddAnimal, useUpdateAnimal, useDeleteAnimal };
export { useWeightsForAnimal, useAddWeightForAnimal, useUpdateWeight, useDeleteWeight };
