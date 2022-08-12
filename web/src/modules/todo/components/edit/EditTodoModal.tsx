import { Center } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useDeleteTodoMutation } from "../../api/useDeleteTodoMutation";
import { useTodoById } from "../../api/useTodoById";
import { useUpdateTodoMutation } from "../../api/useUpdateTodoMutation";
import { UpdateTodoDTO } from "../../dto/update-todo.dto";
import { useConfirmDeleteTodoModal } from "../../hooks/useConfirmDeleteTodoModal";
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
  const deleteTodo = useDeleteTodoMutation();
  const { open } = useConfirmDeleteTodoModal();
  const updateTodo = useUpdateTodoMutation();

  const handleEdit = (data: UpdateTodoDTO) =>
    updateTodo.mutate(
      { id: todoId, data },
      { onSuccess: () => context.closeModal(id) }
    );

  const handleDelete = (todoId: number) =>
    open({
      onConfirm: () => {
        deleteTodo.mutate(todoId);
        context.closeModal(id);
      },
    });

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
              repeat: todo.data.repeat,
            }}
            onEdit={handleEdit}
            onCancel={() => context.closeModal(id)}
            onDelete={() => handleDelete(todo.data.id)}
          />
        </Center>
      )}
    </>
  );
}
