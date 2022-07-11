import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun } from "tabler-icons-react";

export function ColorSchemeSwitch() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      variant="outline"
      color="blue"
      onClick={() => toggleColorScheme()}
    >
      {colorScheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </ActionIcon>
  );
}
