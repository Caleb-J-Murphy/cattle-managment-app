import { db } from '..';
import { eq } from 'drizzle-orm';
import { animals } from '../tables';

export const getAnimals = async () => {
  return db.select().from(animals).all();
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
  id: number,
  tag: string,
  breed?: string,
  birth_date?: string
) => {
  return db
    .update(animals)
    .set({ tag, breed, birth_date })
    .where(eq(animals.id, Number(id)))
    .returning();
};

export const deleteAnimal = async (id: number) => {
  return db.delete(animals).where(eq(animals.id, id));
};
