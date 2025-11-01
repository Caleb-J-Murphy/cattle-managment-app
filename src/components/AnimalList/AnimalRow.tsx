import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, MantineStyleProp, Table } from '@mantine/core';
import { routes } from '@/routing/constants';
import { Animal } from '@/web/types';
import { useDeleteAnimal } from '@/web/useApi';
import { EditAnimalModal } from './EditAnimalModal';

const actionColumnStyles: MantineStyleProp = {
  gap: '16px',
  display: 'flex',
};

interface AnimalRowProps {
  animal: {
    id: number;
    tag_number: string;
    breed?: string;
    birth_date?: string;
  };
  onRefetch: () => void;
}

export const AnimalRow = ({ animal, onRefetch }: AnimalRowProps) => {
  const navigate = useNavigate();
  const deleteAnimal = useDeleteAnimal();
  const [modalOpen, setModalOpen] = useState(false);
  const [editValues, setEditValues] = useState<Animal>(animal);

  const handleViewButton = () => {
    navigate(`/${routes.viewAnimal}/${animal.id}`);
  };

  const handleEditButton = () => {
    setModalOpen(true);
  };
  const handleDeleteButton = (animal: Animal) => {
    deleteAnimal.mutate(animal.id, {
      onSuccess: onRefetch,
    });
  };

  return (
    <Table.Tr key={animal.id}>
      <Table.Td>{animal.tag_number}</Table.Td>
      <Table.Td>{animal.birth_date}</Table.Td>
      <Table.Td>{animal.breed}</Table.Td>
      <Table.Td>
        <Box style={actionColumnStyles}>
          <EditAnimalModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            editValues={editValues}
            setEditValues={setEditValues}
          />
          <Button color="green" onClick={() => handleViewButton()}>
            View
          </Button>
          <Button color="blue" onClick={() => handleEditButton()}>
            Edit
          </Button>
          <Button color="red" onClick={() => handleDeleteButton(animal)}>
            Delete
          </Button>
        </Box>
      </Table.Td>
    </Table.Tr>
  );
};
