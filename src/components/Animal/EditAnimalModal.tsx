import { useState } from 'react';
import { Button, Modal, TextInput } from '@mantine/core';
import { Animal } from '../../web/types';
import { useUpdateAnimal } from '../../web/useApi';

type EditAnimalModalProps = {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  editValues: Animal;
  setEditValues: (value: Animal) => void;
};
export const EditAnimalModal = ({
  modalOpen,
  setModalOpen,
  editValues,
  setEditValues,
}: EditAnimalModalProps) => {
  const editAnimal = useUpdateAnimal();
  const [hasUpdated, setHasUpdated] = useState<boolean>(false);
  const handleEdit = (animalEdit: Animal) => {
    setEditValues(animalEdit);
    setHasUpdated(true);
  };

  const handleSave = () => {
    if (hasUpdated) {
      editAnimal.mutate(editValues);
    }
    setModalOpen(false);
  };
  return (
    <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Edit Animal" centered>
      <TextInput
        label="Tag Number"
        value={editValues.tag}
        onChange={(e) => handleEdit({ ...editValues, tag: e.target.value })}
      />
      <TextInput
        label="Breed"
        value={editValues.breed}
        onChange={(e) => handleEdit({ ...editValues, breed: e.target.value })}
      />
      <TextInput
        label="Birth Date"
        value={editValues.birth_date}
        onChange={(e) => handleEdit({ ...editValues, birth_date: e.target.value })}
      />
      <Button mt="md" onClick={() => handleSave()}>
        Save Changes (TODO: hook up mutation)
      </Button>
    </Modal>
  );
};
