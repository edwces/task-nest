import { useMutation, useQueryClient } from "react-query";
import { AddTodoDTO } from "../dto/add-todo.dto";
import { createTodo } from "../services/todo.service";

export function useAddTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation((data: AddTodoDTO) => createTodo(data), {
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });
}
