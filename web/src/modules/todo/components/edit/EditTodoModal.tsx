import { Center } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useTodoById } from "../../api/useTodoById";
import { useUpdateTodoMutation } from "../../api/useUpdateTodoMutation";
import { UpdateTodoDTO } from "../../dto/update-todo.dto";
import { EditTodoForm } from "./EditTodoForm";

export type EditTodoModalProps = {
  todoId: number;
};

export function EditTodoModal({
  context,
  id,
  innerProps: { todoId },
}: ContextModalProps<EditTodoModalProps>) {
  const todo = useTodoById(todoId);
  const updateTodo = useUpdateTodoMutation();

  const handleEdit = (data: UpdateTodoDTO) =>
    updateTodo.mutate(
      { id: todoId, data },
      { onSuccess: () => context.closeModal(id) }
    );

  return (
    <>
      {todo.data && (
        <Center pr={30}>
          <EditTodoForm
            initialValues={{
              label: todo.data.label,
              description: todo.data.description,
              tagIds: todo.data.tags.map((tag) => tag.id),
              expiresAt: todo.data.expiresAt
                ? new Date(todo.data.expiresAt)
                : null,
            }}
            onEdit={handleEdit}
            onCancel={() => context.closeModal(id)}
          />
        </Center>
      )}
    </>
  );
}
