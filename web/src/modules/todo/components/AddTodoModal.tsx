import { ContextModalProps } from "@mantine/modals";
import { useAddTodoMutation } from "../hooks/useAddTodoMutation";
import { AddTodoForm } from "./AddTodoForm";

export function AddTodoModal({ context, id, innerProps }: ContextModalProps) {
  const createTodo = useAddTodoMutation();

  return (
    <AddTodoForm
      handleSubmit={(values) =>
        createTodo.mutate(values, { onSuccess: () => context.closeModal(id) })
      }
      isSubmitting={createTodo.isLoading}
    />
  );
}
