import { Center, Container } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useTags } from "../../../tag/api/useTags";
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
  const tags = useTags();
  const updateTodo = useUpdateTodoMutation();

  const close = () => context.closeModal(id);
  const handleEdit = (data: UpdateTodoDTO) =>
    updateTodo.mutate({ id: todoId, data }, { onSuccess: () => close() });

  return (
    <>
      {todo.data && tags.data && (
        <Center pr={30}>
          <EditTodoForm
            initialValues={{
              label: todo.data.label,
              description: todo.data.description,
              tagIds: todo.data.tags.map((tag) => tag.id),
              expiresAt: todo.data.expiresAt,
            }}
            onEdit={handleEdit}
            tags={tags.data}
            onCancel={() => close()}
          />
        </Center>
      )}
    </>
  );
}
