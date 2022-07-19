import { Stack } from "@mantine/core";
import { Tag as TagIcon } from "tabler-icons-react";
import { Tag } from "../models/tag.model";
import { NavigationItem } from "./NavigationItem";

interface NavigationItemsListProps {
  data?: ReadonlyArray<Tag>;
  activeItem?: string;
}

export function NavigationItemsList({
  data = [],
  activeItem,
}: NavigationItemsListProps) {
  return (
    <Stack spacing={5}>
      {data.map((tag) => (
        <NavigationItem
          key={tag.id}
          label={tag.label}
          link={`/tags/${tag.label}`}
          icon={<TagIcon size={20} />}
          isActive={activeItem === tag.label}
        ></NavigationItem>
      ))}
    </Stack>
  );
}
