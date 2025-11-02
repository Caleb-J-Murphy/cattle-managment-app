import { Table } from '@mantine/core';
import { useAnimals } from '../../useApi';
import { AnimalRow } from './AnimalRow';

export const AnimalListTable = () => {
  const animalsQuery = useAnimals();

  if (animalsQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (animalsQuery.isError) {
    return <div>Error loading animals</div>;
  }

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Tag</Table.Th>
          <Table.Th>Date of Birth</Table.Th>
          <Table.Th>Breed</Table.Th>
          <Table.Th colSpan={2}>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {animalsQuery.data?.map((animal) => (
          <AnimalRow key={animal.id} animal={animal} onRefetch={animalsQuery.refetch} />
        ))}
      </Table.Tbody>
    </Table>
  );
};
