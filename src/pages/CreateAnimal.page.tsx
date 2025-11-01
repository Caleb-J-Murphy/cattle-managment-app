/* eslint-disable no-console */
import { CreateAnimalControls } from '@/components/CreateAnimal/CreateAnimalControls';
import { CreateAnimalTitle } from '@/components/Titles/CreateAnimalTitle';

export function CreateAnimalPage() {
  // Local state for form inputs

  return (
    <>
      <CreateAnimalTitle />
      <CreateAnimalControls />
    </>
  );
}
