export const CreateWeightVerification = {
  animalIdNotNumber: {
    error: `animalId needs to be a number`,
  },
  animalIdNotDefined: {
    error: 'animal id is required',
  },
  weightValueNotDefined: {
    error: 'weight is required',
  },
  weightDateNotDefined: {
    error: 'weigh date is required',
  },
  failedCreateWeight: (animalId: number) => ({
    error: `Failed ro create weight for animal ${animalId}`,
  }),
};

export const GetWeightVerification = {
  animalIdNotNumber: {
    error: `animalId needs to be a number`,
  },
  weightIdNotNumber: {
    error: 'weightId must be a number',
  },
  noWeightsFoundForAnimal: (animalId: number) => ({
    message: `No weights found for animal '${animalId}.'`,
  }),
  failedGetWeightsForAnimal: (animalId: number) => ({
    error: `Failed to fetch weights for animal '${animalId}'`,
  }),
  weightNotFound: (weightId: number) => ({
    error: `No weight found with ID '${weightId}'`,
  }),
  failedGetWeights: (weightId: number) => ({
    error: `Failed to fetch weights for weight id: '${weightId}'`,
  }),
  failedGetWeight: (weightId: number) => ({
    error: `Failed to fetch weight with ID ${weightId}`,
  }),
};

export const DeleteWeightVerification = {
  weightIdNotDefined: {
    error: 'Weight ID is required',
  },
  weightIdNotNumber: {
    error: `Weight ID needs to be a number`,
  },
  animalNotFound: (weightId: number) => ({
    error: `Weight '${weightId}' not found`,
  }),
  deleteSuccessful: (weightId: number) => ({
    message: `Weight '${weightId}' deleted successfully`,
  }),
  deleteUnsuccessful: (weightId: number) => ({
    error: `Failed to delete weight: '${weightId}'`,
  }),
};

export const UpdateWeightVerification = {
  weightIdNotDefined: {
    error: 'Animal ID is required',
  },
  weightIdNotNumber: {
    error: `Weight ID needs to be a number`,
  },
  weightIdNotFound: (animalId: number) => ({
    error: `Weight ${animalId} not found`,
  }),
  updateUnsuccessful: (animalId: number) => ({
    error: `Failed to update weight ${animalId}`,
  }),
};
