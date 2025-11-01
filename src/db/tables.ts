import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Animals table
export const animals = sqliteTable('animals', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  tag_number: text('tag_number').notNull(),
  breed: text('breed'),
  birth_date: text('birth_date'), // store ISO string
  sex: text('sex'),
  sire_id: integer('sire_id'),
  dam_id: integer('dam_id'),
});

// Events table
export const events = sqliteTable('events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  animal_id: integer('animal_id').notNull(),
  event_type: text('event_type').notNull(),
  event_date: text('event_date').notNull(),
  data: text('data'), // JSON
});

// Workflows table
export const workflows = sqliteTable('workflows', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  config: text('config'), // JSON
});
