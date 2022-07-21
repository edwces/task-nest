import { ActionIcon, Group } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { X } from "tabler-icons-react";
import { useTodoById } from "../hooks/useTodoById";
import { EditTodoForm } from "./EditTodoForm";

export function EditTodoModal({
  context,
  id,
  innerProps,
}: ContextModalProps<{ todoId: number }>) {
  const { data } = useTodoById(innerProps.todoId);

  return (
    <>
      {data && (
        <Group align="start" sx={{ justifyContent: "space-around" }}>
          <EditTodoForm
            initialValues={{ label: data.label, description: data.description }}
          />
          <ActionIcon onClick={() => context.closeModal(id)}>
            <X size={22} />
          </ActionIcon>
        </Group>
      )}
    </>
  );
}
