import { Stack } from "@mantine/core";
import { Tag } from "../models/tag.model";
import { TagLink } from "./TagLink";

interface TagLinksListProps {
  data?: ReadonlyArray<Tag>;
  selectedLabel?: string;
}

export function TagLinksList({ data = [], selectedLabel }: TagLinksListProps) {
  return (
    <Stack>
      {data.map((tag) => (
        <TagLink
          key={tag.id}
          label={tag.label}
          link={`/tags/${tag.label}`}
          isSelected={selectedLabel === tag.label}
        ></TagLink>
      ))}
    </Stack>
  );
}
