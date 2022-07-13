import { useMutation, useQueryClient } from "react-query";
import { AddTodoDTO } from "../components/AddTodoForm";
import { createTodo } from "../services/todo.service";

export function useAddTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation((data: AddTodoDTO) => createTodo(data), {
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });
}
