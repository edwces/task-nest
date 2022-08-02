import { ActionIcon, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { Tag as TagIcon, Trash } from "tabler-icons-react";
import { useDeleteTagMutation } from "../tag/api/useDeleteTagMutation";
import { Tag } from "../tag/models/tag.model";
import { NavigationItem } from "./NavigationItem";

interface TagLinksListProps {
  tags?: ReadonlyArray<Tag>;
  activeItem?: string;
}

export function TagLinksList({ tags = [], activeItem }: TagLinksListProps) {
  const deleteTag = useDeleteTagMutation();
  const router = useRouter();

  return (
    <Stack spacing={5}>
      {tags.map((tag) => (
        <NavigationItem
          key={tag.id}
          label={tag.label}
          link={`/tags/${tag.id}/${tag.label}`}
          leftIcon={<TagIcon size={20} />}
          isActive={activeItem === tag.label}
          rightIcon={
            <ActionIcon
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                deleteTag.mutate(tag.label, {
                  onSuccess: () => {
                    if (router.asPath === `/tags/${tag.id}/${tag.label}`)
                      router.push("/");
                  },
                });
              }}
            >
              <Trash size={20} />
            </ActionIcon>
          }
        ></NavigationItem>
      ))}
    </Stack>
  );
}
