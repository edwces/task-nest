import { ActionIcon, Stack, ThemeIcon } from "@mantine/core";
import { useRouter } from "next/router";
import { Tag as TagIcon, Trash } from "tabler-icons-react";
import { useDeleteTagMutation } from "../tag/api/useDeleteTagMutation";
import { useConfirmDeleteTagModal } from "../tag/hooks/useConfirmDeleteTagModal";
import { Tag } from "../tag/models/tag.model";
import { NavigationItem } from "./NavigationItem";

interface TagLinksListProps {
  tags?: ReadonlyArray<Tag>;
  activeItem?: string;
}

export function TagLinksList({ tags = [], activeItem }: TagLinksListProps) {
  const deleteTag = useDeleteTagMutation();
  const { open } = useConfirmDeleteTagModal();
  const router = useRouter();

  const handleOpenModal = (tag: Tag) => {
    open({
      label: tag.label,
      onConfirm: () =>
        deleteTag.mutate(tag.label, {
          onSuccess: () => {
            if (router.asPath === `/tags/${tag.id}/${tag.label}`)
              router.push("/");
          },
        }),
    });
  };

  return (
    <Stack spacing={5}>
      {tags.map((tag) => (
        <NavigationItem
          key={tag.id}
          label={tag.label}
          link={`/tags/${tag.id}/${tag.label}`}
          leftIcon={
            <ThemeIcon variant="light" color="gray">
              <TagIcon size={20} />
            </ThemeIcon>
          }
          isActive={activeItem === tag.label}
          rightIcon={
            <ActionIcon
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                handleOpenModal(tag);
              }}
              variant="transparent"
              color="gray"
              sx={(theme) => ({
                "&:hover": {
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.red[4]
                      : theme.colors.red[8],
                },
              })}
            >
              <Trash size={20} />
            </ActionIcon>
          }
        ></NavigationItem>
      ))}
    </Stack>
  );
}
