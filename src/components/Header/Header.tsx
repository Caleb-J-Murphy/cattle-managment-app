import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import classes from "./Header.module.css";

export function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <div className={classes.header}>
      <ActionIcon
        variant="outline"
        color={dark ? "yellow" : "blue"}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <IconSun size={20} /> : <IconMoonStars size={20} />}
      </ActionIcon>
    </div>
  );
}
