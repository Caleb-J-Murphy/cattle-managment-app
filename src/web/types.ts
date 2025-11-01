export type Animal = {
  id: number;
  tag_number: string;
  breed?: string;
  birth_date?: string;
  sex?: string;
  sire_id?: number;
  dam_id?: number;
};

export type NewAnimal = {
  tag_number: string;
  breed?: string;
  birth_date?: string;
};

export type Event = {
  id: number;
  animal_id: number;
  event_type: string;
  event_date: string;
  data?: Record<string, any>;
};

export type Workflow = {
  id: number;
  name: string;
  config?: Record<string, any>;
};
