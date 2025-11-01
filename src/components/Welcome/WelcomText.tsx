import { Text } from "@mantine/core";
import classes from "./Welcome.module.css";

export function WelcomeText() {
  return (
    <Text className={classes.normal} ta="center" size="lg">
      The only livestock app you will need
    </Text>
  );
}
