import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Animals table
export const animals = sqliteTable('animals', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  tag: text('tag').notNull(),
  breed: text('breed'),
  birth_date: text('birth_date'), // store ISO string
  sex: text('sex'),
  sire_id: integer('sire_id'),
  dam_id: integer('dam_id'),
});

// Weights table
export const weights = sqliteTable('weights', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  animal_id: integer('animal_id').notNull(),
  weight_date: text('weight_date').notNull(),
  weight_value_kg: real('weight_value_kg').notNull(),
});
