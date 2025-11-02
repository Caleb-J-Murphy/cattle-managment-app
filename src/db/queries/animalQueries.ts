import { db } from '..';
import { eq } from 'drizzle-orm';
import { animals } from '../tables';

export const getAnimals = async () => {
  return db.select().from(animals).all();
};

export const getAnimal = async (animalId: number) => {
  return db.select().from(animals).where(eq(animals.id, animalId)).all();
};

export const addAnimal = async (tag: string, breed?: string, birth_date?: string) => {
  return db
    .insert(animals)
    .values({
      tag,
      breed,
      birth_date,
    })
    .returning();
};

export const updateAnimal = async (
  animalId: number,
  tag: string,
  breed?: string,
  birthDate?: string
) => {
  return db
    .update(animals)
    .set({
      tag,
      breed,
      birth_date: birthDate,
    })
    .where(eq(animals.id, animalId))
    .returning();
};

export const deleteAnimal = async (id: number) => {
  return db.delete(animals).where(eq(animals.id, id));
};
