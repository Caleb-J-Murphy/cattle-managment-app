import { useState } from "react";
import { Box, Button, Stack, Text, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useAddAnimal } from "@/web/useApi";
import classes from "./CreateAnimalControls.module.css";

export const CreateAnimalControls = () => {
  const [tagNumber, setTagNumber] = useState<string | null>(null);
  const [breed, setBreed] = useState<string | null>("Wagyu");
  const [birthDate, setBirthDate] = useState<string | null>(null);

  // Mutation hook
  const addAnimalMutation = useAddAnimal();

  const handleAddAnimal = async () => {
    if (!tagNumber) {
      alert("Tag number is required");
      return;
    }

    try {
      await addAnimalMutation.mutateAsync({
        tag_number: tagNumber,
        breed: breed || undefined,
        birth_date: birthDate ? birthDate : undefined,
      });

      // Clear inputs
      setTagNumber(null);
      setBreed(null);
      setBirthDate(null);
    } catch (error) {
      console.error("Failed to add animal", error);
    }
  };
  return (
    <div style={{ display: "flex", gap: 32, padding: 16 }}>
      {/* Left stack for text inputs */}
      <Stack style={{ flex: 1, maxWidth: 300 }} gap="sm">
        <TextInput
          label="Tag Number"
          placeholder="Enter tag number"
          value={tagNumber ?? ""}
          onChange={(e) => setTagNumber(e.currentTarget.value)}
          required
        />
        <TextInput
          label="Breed"
          placeholder="Enter breed"
          value={breed ?? ""}
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
