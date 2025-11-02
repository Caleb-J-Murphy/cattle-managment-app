import React from 'react';
import { Button } from '@mantine/core';
import { useAddAnimal, useAnimals } from '../useApi';

export default function DashboardPage() {
  // Mutation hook
  const addAnimalMutation = useAddAnimal();

  // Query hook to see current animals
  const { data: animals, refetch } = useAnimals();

  const handleAddDummyAnimal = async () => {
    try {
      await addAnimalMutation.mutateAsync({
        tag: 'DUMMY123',
        breed: 'Wagyu',
        birth_date: '2025-01-01',
      });

      // Refetch animals to verify it was added
      refetch();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to add animal', error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: 16 }}>
        <h1>Welcome to the Dashboard</h1>
        <p>This is the main content area next to the navbar.</p>

        <Button onClick={handleAddDummyAnimal}>Add Dummy Animal</Button>

        <h2>Current Animals:</h2>
        {animals?.length ? (
          <ul>
            {animals.map((a) => (
              <li key={a.id}>
                {a.tag} - {a.breed} - {a.birth_date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No animals yet</p>
        )}
      </div>
    </div>
  );
}
