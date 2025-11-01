import { ReactNode, useEffect, useState } from 'react';
import { Table } from '@mantine/core';
import { useAnimals } from '@/web/useApi';

export const AnimalListTable = () => {
  const animalsQuery = useAnimals();

  const [animalRows, setAnimalRows] = useState<ReactNode[]>([]);
  useEffect(() => {
    setAnimalRows(
      (
        animalsQuery.data?.map((animalEntry) => ({
          id: animalEntry.id,
          tag: animalEntry.tag_number,
          DoB: animalEntry.birth_date,
          breed: animalEntry.breed,
        })) ?? []
      ).map((element) => (
        <Table.Tr key={element.id}>
          <Table.Td>{element.tag}</Table.Td>
          <Table.Td>{element.DoB}</Table.Td>
          <Table.Td>{element.breed}</Table.Td>
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
