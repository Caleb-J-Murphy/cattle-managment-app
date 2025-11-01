import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { Animal, Event, NewAnimal, Workflow } from './types';

const API_BASE = 'http://localhost:3001/api';

// -------------------- Animals --------------------
export const useAnimals = (): UseQueryResult<Animal[], Error> => {
  return useQuery<Animal[], Error>({
    queryKey: ['animals'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/animals`);
      if (!res.ok) {
        throw new Error('Failed to fetch animals');
      }
      return res.json() as Promise<Animal[]>;
    },
    refetchInterval: 1000,
  });
};

export const useAddAnimal = (): UseMutationResult<Animal, Error, NewAnimal> => {
  const queryClient = useQueryClient();

  return useMutation<Animal, Error, NewAnimal>({
    mutationFn: async (newAnimal: NewAnimal) => {
      const res = await fetch(`${API_BASE}/animals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnimal),
      });
      if (!res.ok) {
        throw new Error('Failed to add animal');
      }
      return res.json() as Promise<Animal>;
    },
    // TODO: Fix this to not require this line
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
    },
  });
};

export const useUpdateAnimal = (): UseMutationResult<Animal, Error, Animal> => {
  const queryClient = useQueryClient();

  return useMutation<Animal, Error, Animal>({
    mutationFn: async (animal: Animal) => {
      const res = await fetch(`${API_BASE}/animals/${animal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tag_number: animal.tag_number,
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
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_BASE}/animals/${id}`, {
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

// -------------------- Events --------------------
export const useEventsForAnimal = (animalId: number): UseQueryResult<Event[], Error> => {
  return useQuery<Event[], Error>({
    queryKey: ['events', animalId],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/events/${animalId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
      return res.json() as Promise<Event[]>;
    },
  });
};

export const useAddEvent = (): UseMutationResult<Event, Error, Event> => {
  const queryClient = useQueryClient();

  return useMutation<Event, Error, Event>({
    mutationFn: async (event: Event) => {
      const res = await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      if (!res.ok) {
        throw new Error('Failed to add event');
      }
      return res.json() as Promise<Event>;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['events', variables.animal_id],
      });
    },
  });
};

// -------------------- Workflows --------------------
export const useWorkflows = (): UseQueryResult<Workflow[], Error> => {
  return useQuery<Workflow[], Error>({
    queryKey: ['workflows'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/workflows`);
      if (!res.ok) {
        throw new Error('Failed to fetch workflows');
      }
      return res.json() as Promise<Workflow[]>;
    },
  });
};

export const useAddWorkflow = (): UseMutationResult<Workflow, Error, Workflow> => {
  const queryClient = useQueryClient();

  return useMutation<Workflow, Error, Workflow>({
    mutationFn: async (workflow: Workflow) => {
      const res = await fetch(`${API_BASE}/workflows`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workflow),
      });
      if (!res.ok) {
        throw new Error('Failed to add workflow');
      }
      return res.json() as Promise<Workflow>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
  });
};
