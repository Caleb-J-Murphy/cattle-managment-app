import { eq } from 'drizzle-orm';
import { db } from '../index.js';
import { weights } from '../tables.js';

// TODO create a way to get all weights

export const getWeightsForAnimal = async (animalId: number) => {
  return db.select().from(weights).where(eq(weights.animal_id, animalId)).all();
};

export const getWeight = async (weightId: number) => {
  return db.select().from(weights).where(eq(weights.id, weightId)).all();
};

export const addWeight = async (animalId: number, weightDate: string, weightValueKg: number) => {
  return db
    .insert(weights)
    .values({
      animal_id: animalId,
      weight_date: weightDate,
      weight_value_kg: weightValueKg,
    })
    .returning();
};

export const updateWeight = async (
  weightId: number,
  animalId: number,
  weightDate?: string,
  weightValueKg?: number
) => {
  return db
    .update(weights)
    .set({
      weight_date: weightDate,
      animal_id: animalId,
      weight_value_kg: weightValueKg,
    })
    .where(eq(weights.id, weightId))
    .returning();
};

export const deleteWeight = async (weightId: number) => {
  return db.delete(weights).where(eq(weights.id, weightId));
};
