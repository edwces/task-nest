import { ActionIcon, Group } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { X } from "tabler-icons-react";
import { useTodoById } from "../hooks/useTodoById";
import { useUpdateTodoMutation } from "../hooks/useUpdateTodoMutation";
import { EditTodoForm } from "./EditTodoForm";

export function EditTodoModal({
  context,
  id,
  innerProps,
}: ContextModalProps<{ todoId: number }>) {
  const { data } = useTodoById(innerProps.todoId);
  const updateTodo = useUpdateTodoMutation();

  return (
    <>
      {data && (
        <Group align="start" sx={{ justifyContent: "space-around" }}>
          <EditTodoForm
            initialValues={{ label: data.label, description: data.description }}
            onSubmit={(dto) =>
              updateTodo.mutate(
                { id: innerProps.todoId, dto },
                { onSuccess: () => context.closeModal(id) }
              )
            }
          />
          <ActionIcon onClick={() => context.closeModal(id)}>
            <X size={22} />
          </ActionIcon>
        </Group>
      )}
    </>
  );
}
