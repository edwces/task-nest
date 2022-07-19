import { Badge, Checkbox, Group } from "@mantine/core";
import { ChangeEventHandler } from "react";
import { Tag } from "../../navigation/models/tag.model";

interface TodoItemProps {
  label?: string;
  onCheck?: ChangeEventHandler<HTMLInputElement>;
  tag?: Tag | null;
}

export function TodoItem({ label = "", onCheck, tag }: TodoItemProps) {
  return (
    <Group position="apart">
      <Checkbox label={label} size="xl" radius="xl" onChange={onCheck} />
      {tag && <Badge>{tag.label}</Badge>}
    </Group>
  );
}
