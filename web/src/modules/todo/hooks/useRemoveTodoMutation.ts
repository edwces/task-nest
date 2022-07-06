import { useMutation, useQueryClient } from "react-query";
import { removeTodo } from "../services/todo.service";

export function useRemoveTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation((id: number) => removeTodo(id), {
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });
}
