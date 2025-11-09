import { useState } from 'react';
import { Button, Group, Modal, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useAddWeightForAnimal } from '../../useApi';

export const AnimalAddWeight = ({ animalId }: { animalId: number }) => {
  const [opened, setOpened] = useState(false);
  const [date, setDate] = useState<string | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const addWeight = useAddWeightForAnimal();

  const handleSubmit = async () => {
    if (!date || !weight) {
      return;
    }
    await addWeight.mutateAsync({
      animal_id: Number(animalId),
      weight_date: date,
      weight_value_kg: weight,
    });
    setOpened(false);
  };

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add Animal Weight" centered>
        <DatePicker allowDeselect value={date} onChange={setDate} />

        <TextInput
          label="Weight"
          description="In KG"
          placeholder="Enter a weight"
          value={weight ?? ''}
          onChange={(event) => setWeight(Number(event.currentTarget.value))}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="light" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={addWeight.isPending}>
            Done
          </Button>
        </Group>
      </Modal>

      <Button onClick={() => setOpened(true)}>Add Weight</Button>
    </>
  );
};
