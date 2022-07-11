import { Checkbox, Paper } from "@mantine/core";
import { ChangeEventHandler } from "react";

interface TodoItemProps {
  label?: string;
  onCheck?: ChangeEventHandler<HTMLInputElement>;
}

export function TodoItem({ label = "", onCheck }: TodoItemProps) {
  return <Checkbox label={label} size="xl" radius="xl" onChange={onCheck} />;
}
