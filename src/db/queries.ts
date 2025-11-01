import { eq } from "drizzle-orm";
import { db } from "./index";
import { animals, events, workflows } from "./tables";

// Animals
export const getAnimals = async () => {
  return await db.select().from(animals).all();
};

export const addAnimal = async (
  tag: string,
  breed?: string,
  birth?: string
) => {
  return await db.insert(animals).values({
    tag_number: tag,
    breed,
    birth_date: birth,
  });
};

// Events
export const addEvent = async (
  animalId: number,
  type: string,
  date: string,
  data: object
) => {
  return await db.insert(events).values({
    animal_id: animalId,
    event_type: type,
    event_date: date,
    data: JSON.stringify(data),
  });
};

export const getEventsForAnimal = async (animalId: number) => {
  return await db
    .select()
    .from(events)
    .where(eq(events.animal_id, animalId)) // use eq() function
    .all();
};

// Workflows
export const addWorkflow = async (name: string, config: object) => {
  return await db
    .insert(workflows)
    .values({ name, config: JSON.stringify(config) });
};

export const getWorkflows = async () => {
  return await db.select().from(workflows).all();
};
