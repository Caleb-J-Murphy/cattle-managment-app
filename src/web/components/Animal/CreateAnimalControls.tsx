import { useState } from 'react';
import { Box, Button, Stack, Text, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useAddAnimal } from '../../useApi';
import classes from './CreateAnimalControls.module.css';

export const CreateAnimalControls = () => {
  const [tag, settag] = useState<string | null>(null);
  const [breed, setBreed] = useState<string | null>('Wagyu');
  const [birthDate, setBirthDate] = useState<string | null>(null);

  // Mutation hook
  const addAnimalMutation = useAddAnimal();

  const handleAddAnimal = async () => {
    if (!tag) {
      // eslint-disable-next-line no-alert
      alert('Tag number is required');
      return;
    }

    try {
      await addAnimalMutation.mutateAsync({
        tag,
        breed: breed || undefined,
        birth_date: birthDate ? birthDate : undefined,
      });

      // Clear inputs
      settag(null);
      setBreed(null);
      setBirthDate(null);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to add animal', error);
    }
  };
  return (
    <div style={{ display: 'flex', gap: 32, padding: 16 }}>
      {/* Left stack for text inputs */}
      <Stack style={{ flex: 1, maxWidth: 300 }} gap="sm">
        <TextInput
          label="Tag Number"
          placeholder="Enter tag number"
          value={tag ?? ''}
          onChange={(e) => settag(e.currentTarget.value)}
          required
        />
        <TextInput
          label="Breed"
          placeholder="Enter breed"
          value={breed ?? ''}
          onChange={(e) => setBreed(e.currentTarget.value)}
        />
        <Button
          onClick={handleAddAnimal}
          loading={addAnimalMutation.isPending}
          mt="auto" // pushes button to bottom of stack
        >
          Add Animal
        </Button>
      </Stack>

      <Box className={classes.datePickerContainer}>
        <Text>Birth Date</Text>
        <DatePicker allowDeselect value={birthDate} onChange={setBirthDate} />
      </Box>
    </div>
  );
};
