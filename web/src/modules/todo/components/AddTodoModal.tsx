import { ContextModalProps } from "@mantine/modals";
import { AddTodoForm } from "./AddTodoForm";

export function AddTodoModal({ context, id, innerProps }: ContextModalProps) {
  return <AddTodoForm handleSubmit={(values) => console.log(values)} />;
}
