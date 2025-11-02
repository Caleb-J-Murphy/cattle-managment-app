import { Title } from '@mantine/core';
import classes from './Title.module.css';

export function CreateAnimalTitle() {
  return (
    <>
      <Title className={classes.title} ta="left" mt={10}>
        Create Animal
      </Title>
    </>
  );
}
