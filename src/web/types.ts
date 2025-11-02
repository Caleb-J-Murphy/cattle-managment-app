export type Animal = {
  id: number;
  tag: string;
  breed?: string;
  birth_date?: string;
  sex?: string;
  sire_id?: number;
  dam_id?: number;
};

export type Weight = {
  id: number;
  animal_id: number;
  weight_kg: number;
  weight_date: number;
};

// Extended to include other animal ebv types
export type EBV = Wagyu_EBV;

export type Wagyu_EBV = {
  gestationLengthDays?: number;
  birthWeight?: number;
  weight200DaysKg?: number;
  weight400DaysKg?: number;
  weight600DaysKg?: number;
  matureCowWeightKg?: number;
  milkKg?: number;
  scrotalSizeKg?: number;
  carcusWeightKg?: number;
  eyeMuscleAreaKg?: number;
  rumpFatMm?: number;
  retailBeefYeildPerc?: number;
  marbleScore?: number;
  marbleFinenessPerc?: number;
};

export type NewAnimal = {
  tag: string;
  breed?: string;
  birth_date?: string;
};
