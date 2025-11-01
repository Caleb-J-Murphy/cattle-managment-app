import { ReactNode, useEffect, useState } from 'react';
import { Button, Table } from '@mantine/core';
import { useAnimals, useDeleteAnimal } from '@/web/useApi';

export const AnimalListTable = () => {
  const animalsQuery = useAnimals();
  const deleteAnimal = useDeleteAnimal();

  const [animalRows, setAnimalRows] = useState<ReactNode[]>([]);
  useEffect(() => {
    if (!animalsQuery.data) return;

    setAnimalRows(
      animalsQuery.data.map((animal) => (
        <Table.Tr key={animal.id}>
          <Table.Td>{animal.tag_number}</Table.Td>
          <Table.Td>{animal.birth_date}</Table.Td>
          <Table.Td>{animal.breed}</Table.Td>
          <Table.Td>
            <Button
              color="red"
              onClick={() => {
                deleteAnimal.mutate(animal.id, {
                  onSuccess: () => animalsQuery.refetch(),
                });
              }}
            >
              Delete
            </Button>
          </Table.Td>
        </Table.Tr>
      ))
    );
  }, [animalsQuery.data]);

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Tag</Table.Th>
          <Table.Th>Date of Birth</Table.Th>
          <Table.Th>Breed</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{animalRows}</Table.Tbody>
    </Table>
  );
};
