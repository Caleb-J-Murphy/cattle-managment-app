import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { WEIGHT_ROUTE } from '../../routes/weights';
import { Weight } from '../types';
import { API_BASE } from '../useApi';

export const useWeightsForAnimal = (animalId: string): UseQueryResult<Weight[], Error> => {
  return useQuery<Weight[], Error>({
    queryKey: ['weight', animalId],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}${WEIGHT_ROUTE}/${animalId}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch weights for animal ${animalId}`);
      }
      return res.json() as Promise<Weight[]>;
    },
    enabled: !!animalId,
  });
};

export const useAddWeightForAnimal = (): UseMutationResult<Weight, Error, Weight> => {
  const queryClient = useQueryClient();

  return useMutation<Weight, Error, Weight>({
    mutationFn: async (newWeight: Weight) => {
      const res = await fetch(`${API_BASE}${WEIGHT_ROUTE}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWeight),
      });
      if (!res.ok) {
        throw new Error('Failed to add new weight');
      }
      return res.json() as Promise<Weight>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weight'] });
    },
  });
};

export const useUpdateWeight = (): UseMutationResult<Weight, Error, Weight> => {
  const queryClient = useQueryClient();

  return useMutation<Weight, Error, Weight>({
    mutationFn: async (weight: Weight) => {
      const res = await fetch(`${API_BASE}${WEIGHT_ROUTE}/${weight.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          animalId: weight.animal_id,
          weightDate: weight.weight_date,
          weightValueKg: weight.weight_kg,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update animal');
      }

      return res.json() as Promise<Weight>;
    },
    onSuccess: () => {
      // Refetch weight list after updating one
      queryClient.invalidateQueries({ queryKey: ['weight'] });
    },
  });
};

export const useDeleteWeight = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_BASE}${WEIGHT_ROUTE}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete weight');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weight'] });
    },
  });
};
