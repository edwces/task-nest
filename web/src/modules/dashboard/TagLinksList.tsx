import { Stack } from "@mantine/core";
import { Tag as TagIcon } from "tabler-icons-react";
import { Tag } from "../tag/models/tag.model";
import { NavigationItem } from "./NavigationItem";

interface TagLinksListProps {
  tags?: ReadonlyArray<Tag>;
  activeItem?: string;
}

export function TagLinksList({ tags = [], activeItem }: TagLinksListProps) {
  return (
    <Stack spacing={5}>
      {tags.map((tag) => (
        <NavigationItem
          key={tag.id}
          label={tag.label}
          link={`/tags/${tag.id}/${tag.label}`}
          icon={<TagIcon size={20} />}
          isActive={activeItem === tag.label}
        ></NavigationItem>
      ))}
    </Stack>
  );
}
