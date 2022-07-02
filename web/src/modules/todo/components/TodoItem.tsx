import { Checkbox } from "@mantine/core";

interface TodoItemProps {
  label?: string;
}

export function TodoItem({ label = "" }: TodoItemProps) {
  return <Checkbox label={label} />;
}
