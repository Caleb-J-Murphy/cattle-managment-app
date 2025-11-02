import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { ANIMAL_ROUTE } from '../../routes/animals';
import { API_BASE } from '../api/useApi';
import { Animal, NewAnimal } from '../types';

export const useAnimals = (): UseQueryResult<Animal[], Error> => {
  return useQuery<Animal[], Error>({
    queryKey: ['animals'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}${ANIMAL_ROUTE}`);
      if (!res.ok) {
        throw new Error('Failed to fetch animals');
      }
      return res.json() as Promise<Animal[]>;
    },
    refetchInterval: 1000,
  });
};

// TODO add a way to get a single animal from their animal ID

export const useAddAnimal = (): UseMutationResult<Animal, Error, NewAnimal> => {
  const queryClient = useQueryClient();

  return useMutation<Animal, Error, NewAnimal>({
    mutationFn: async (newAnimal: NewAnimal) => {
      const res = await fetch(`${API_BASE}${ANIMAL_ROUTE}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnimal),
      });
      if (!res.ok) {
        throw new Error('Failed to add animal');
      }
      return res.json() as Promise<Animal>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
    },
  });
};

export const useUpdateAnimal = (): UseMutationResult<Animal, Error, Animal> => {
  const queryClient = useQueryClient();

  return useMutation<Animal, Error, Animal>({
    mutationFn: async (animal: Animal) => {
      const res = await fetch(`${API_BASE}${ANIMAL_ROUTE}/${animal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tag: animal.tag,
          breed: animal.breed,
          birth_date: animal.birth_date,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update animal');
      }

      return res.json() as Promise<Animal>;
    },
    onSuccess: () => {
      // Refetch animal list after updating one
      queryClient.invalidateQueries({ queryKey: ['animals'] });
    },
  });
};

export const useDeleteAnimal = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (animalId: number) => {
      const res = await fetch(`${API_BASE}${ANIMAL_ROUTE}/${animalId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete animal');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
    },
  });
};
