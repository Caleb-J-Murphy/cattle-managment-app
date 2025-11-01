import { Title } from "@mantine/core";
import classes from "./Title.module.css";

export function AnimalListTitle() {
  return (
    <>
      <Title className={classes.title} ta="left" mt={10}>
        Animals
      </Title>
    </>
  );
}
