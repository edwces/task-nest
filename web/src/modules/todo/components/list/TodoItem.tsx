import { ActionIcon, Badge, Checkbox, Group } from "@mantine/core";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { Edit } from "tabler-icons-react";
import { Tag } from "../../../tag/models/tag.model";

interface TodoItemProps {
  label?: string;
  onCheck?: ChangeEventHandler<HTMLInputElement>;
  onEdit?: MouseEventHandler<HTMLButtonElement>;
  tags?: ReadonlyArray<Tag>;
}

export function TodoItem({ label, onCheck, onEdit, tags = [] }: TodoItemProps) {
  return (
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
  );
}
