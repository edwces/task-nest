import { ActionIcon, Badge, Checkbox, Group, Stack, Text } from "@mantine/core";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { Calendar, Edit } from "tabler-icons-react";
import { Tag } from "../../../tag/models/tag.model";

interface TodoItemProps {
  label?: string;
  expiresAt?: string;
  isExpired?: boolean;
  onCheck?: ChangeEventHandler<HTMLInputElement>;
  onEdit?: MouseEventHandler<HTMLButtonElement>;
  tags?: ReadonlyArray<Tag>;
}

export function TodoItem({
  label,
  onCheck,
  onEdit,
  isExpired = false,
  tags = [],
  expiresAt,
}: TodoItemProps) {
  return (
    <Stack spacing={3}>
      <Group position="apart">
        <Checkbox label={label} size="xl" radius="xl" onChange={onCheck} />
        <Group>
          {tags.map((tag) => (
            <Badge key={tag.id}>{tag.label}</Badge>
          ))}
          <ActionIcon onClick={onEdit}>
            <Edit size={25} />
          </ActionIcon>
        </Group>
      </Group>
      {expiresAt && (
        <Group ml={45} spacing={6}>
          <Calendar size={15} color={isExpired ? "red" : undefined} />
          <Text color={isExpired ? "red" : "dimmed"} size="xs">
            {expiresAt}
          </Text>
        </Group>
      )}
    </Stack>
  );
}
