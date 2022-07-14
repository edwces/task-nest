import { Stack } from "@mantine/core";
import { Tag } from "../models/tag.model";
import { TagLink } from "./TagLink";

interface TagLinksListProps {
  data?: ReadonlyArray<Tag>;
}

export function TagLinksList({ data = [] }: TagLinksListProps) {
  return (
    <Stack>
      {data.map((tag) => (
        <TagLink
          key={tag.id}
          label={tag.label}
          link={`/tags/${tag.label}`}
        ></TagLink>
      ))}
    </Stack>
  );
}
