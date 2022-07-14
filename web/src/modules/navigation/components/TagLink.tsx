import { Group, Text, Button } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { Tag } from "tabler-icons-react";

interface TagLinkProps {
  label: string;
  link?: string;
  isSelected?: boolean;
}

export function TagLink({
  label,
  link = "#",
  isSelected = false,
}: TagLinkProps) {
  return (
    <Button
      component={NextLink}
      href={link}
      variant={isSelected ? "light" : "default"}
      leftIcon={<Tag size={16} />}
    >
      {label}
    </Button>
  );
}
