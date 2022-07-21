import { ActionIcon, Badge, Checkbox, Group } from "@mantine/core";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { Edit } from "tabler-icons-react";
import { Tag } from "../../navigation/models/tag.model";

interface TodoItemProps {
  label?: string;
  onCheck?: ChangeEventHandler<HTMLInputElement>;
  onEdit?: MouseEventHandler<HTMLButtonElement>;
  tag?: Tag | null;
}

export function TodoItem({ label = "", onCheck, onEdit, tag }: TodoItemProps) {
  return (
    <Group position="apart">
      <Checkbox label={label} size="xl" radius="xl" onChange={onCheck} />
      <Group>
        {tag && <Badge>{tag.label}</Badge>}
        <ActionIcon onClick={onEdit}>
          <Edit size={25} />
        </ActionIcon>
      </Group>
    </Group>
  );
}
