import { useMutation, useQueryClient } from "react-query";
import { http } from "../../../config/httpClient";
import { CreateTodoDTO } from "../dto/create-todo.dto";

function createTodo(data: CreateTodoDTO) {
  return http.post<void>("me/todos", data);
}
export function useCreateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation((data: CreateTodoDTO) => createTodo(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["me", "todos"]);
      queryClient.invalidateQueries(["me", "tags", "todos"]);
    },
  });
}
