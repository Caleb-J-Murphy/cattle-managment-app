import { db } from '..';
import { eq } from 'drizzle-orm';
import { weights } from '../tables';

export const getWeightsForAnimal = async (animalId: number) => {
  return db.select().from(weights).where(eq(weights.animal_id, animalId)).all();
};

export const addWeightForAnimal = async (
  animalId: number,
  weightDate: string,
  weightValueKg: number
) => {
  return db
    .insert(weights)
    .values({
      animal_id: animalId,
      weight_date: weightDate,
      weight_value_kg: weightValueKg,
    })
    .returning();
};
