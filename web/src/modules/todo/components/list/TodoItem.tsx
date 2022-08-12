import {
  ActionIcon,
  Badge,
  Checkbox,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { Bookmark, Calendar, Edit, Repeat } from "tabler-icons-react";
import { Tag } from "../../../tag/models/tag.model";

interface TodoItemProps {
  label?: string;
  expiresAt?: string | null;
  isExpired?: boolean;
  isRepeating?: boolean;
  isBookmarked?: boolean;
  onCheck?: ChangeEventHandler<HTMLInputElement>;
  onEdit?: MouseEventHandler<HTMLButtonElement>;
  onBookmark?: MouseEventHandler<HTMLButtonElement>;
  tags?: ReadonlyArray<Tag>;
}

export function TodoItem({
  label,
  onCheck,
  onEdit,
  onBookmark,
  isExpired = false,
  isBookmarked = false,
  isRepeating = false,
  tags = [],
  expiresAt,
}: TodoItemProps) {
  const theme = useMantineTheme();

  return (
    <Stack spacing={3}>
      <Group position="apart" noWrap align="flex-start">
        <Checkbox
          label={label}
          size="xl"
          radius="xl"
          styles={{ root: { alignItems: "flex-start" } }}
          onChange={onCheck}
        />
        <Group noWrap>
          {tags.map((tag) => (
            <Link key={tag.id} href={`/tags/${tag.id}/${tag.label}`} passHref>
              <Badge
                component="a"
                sx={{
                  cursor: "pointer",
                }}
              >
                {tag.label}
              </Badge>
            </Link>
          ))}
          <Group spacing={20}>
            <ActionIcon
              color={isBookmarked ? "red" : "gray"}
              onClick={onBookmark}
            >
              <Bookmark
                size={25}
                fill={
                  isBookmarked
                    ? theme.fn.variant({ variant: "outline", color: "red" })
                        .color
                    : "transparent"
                }
              />
            </ActionIcon>
            <ActionIcon onClick={onEdit}>
              <Edit size={25} />
            </ActionIcon>
          </Group>
        </Group>
      </Group>
      <Group ml={45} spacing={6}>
        {isRepeating && <Repeat size={15} />}
        {expiresAt && (
          <>
            <Calendar size={15} color={isExpired ? "red" : undefined} />
            <Text color={isExpired ? "red" : "dimmed"} size="xs">
              {expiresAt}
            </Text>
          </>
        )}
      </Group>
    </Stack>
  );
}
