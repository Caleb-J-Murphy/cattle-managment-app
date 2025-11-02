export const CreateAnimalVerification = {
  tagNotDefined: {
    error: 'tag is required',
  },
  failedCreateAnimal: (tag: string) => ({
    error: `Failed ro create animal: '${tag}'`,
  }),
};

export const UpdateAnimalVerification = {
  animalIdNotNumber: {
    error: `Animal ID needs to be a number`,
  },
  animalIdNotFound: (animalId: number) => ({
    error: `Animal ${animalId} not found`,
  }),
  updateUnsuccessful: (animalId: number) => ({
    error: `Failed to update animal ${animalId}`,
  }),
};

export const DeleteAnimalVerification = {
  animalIdNotNumber: {
    error: `Animal ID needs to be a number`,
  },
  animalNotFound: (animalId: number) => ({
    error: `Animal '${animalId}' not found`,
  }),
  deleteSuccessful: (animalId: number) => ({
    message: `Animal '${animalId}' deleted successfully`,
  }),
  deleteUnsuccessful: (animalId: number) => ({
    error: `Failed to delete animal: '${animalId}'`,
  }),
};
