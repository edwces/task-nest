import { Group, UnstyledButton, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { Tag } from "tabler-icons-react";

interface TagLinkProps {
  label: string;
  link?: string;
}

export function TagLink({ label, link = "#" }: TagLinkProps) {
  return (
    <UnstyledButton component={NextLink} href={link}>
      <Group spacing={8}>
        <Tag size={16} />
        <Text>{label}</Text>
      </Group>
    </UnstyledButton>
  );
}
