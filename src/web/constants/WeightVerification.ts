export const CreateWeightVerification = {
  animalIdNotNumber: {
    error: `animalId needs to be a number`,
  },
  animalIdNotDefined: {
    error: 'weight_kg is required',
  },
  weightValueNotDefined: {
    error: 'weight_kg is required',
  },
  weightDateNotDefined: {
    error: 'weight_kg is required',
  },
  failedCreateWeight: (animalId: number) => ({
    error: `Failed ro create weight for animal ${animalId}`,
  }),
};

export const GetWeightVerification = {
  animalIdNotNumber: {
    error: `animalId needs to be a number`,
  },
  noWeightsFound: {
    message: 'No weights found for this animal.',
  },
  failedGetWeights: (animalId: number) => ({
    error: `Failed to fetch weights for animal ${animalId}`,
  }),
};
