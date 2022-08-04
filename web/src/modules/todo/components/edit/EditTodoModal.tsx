import { Container } from "@mantine/core";
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

  const close = () => context.closeModal(id);
  const handleEdit = (data: UpdateTodoDTO) =>
    updateTodo.mutate({ id: todoId, data }, { onSuccess: () => close() });

  return (
    <>
      {todo.data && (
        <Container px={20} py={10}>
          <EditTodoForm
            initialValues={{
              label: todo.data.label,
              description: todo.data.description,
            }}
            onEdit={handleEdit}
          />
        </Container>
      )}
    </>
  );
}
