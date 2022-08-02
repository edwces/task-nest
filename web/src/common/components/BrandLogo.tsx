import { Group, Text, Title } from "@mantine/core";
import { Checkbox } from "tabler-icons-react";

export function BrandLogo() {
  return (
    <Group>
      <Checkbox color="violet" size={35} />
      <Title>
        <Text inherit>Todone</Text>
      </Title>
    </Group>
  );
}
