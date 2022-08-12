import { useMutation, useQueryClient } from "react-query";
import { http } from "../../../config/httpClient";

function tickTodo(id: number) {
  return http.post<void>(`me/todos/${id}/tick`);
}

export function useTickTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation((id: number) => tickTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["me", "todos"]);
      queryClient.invalidateQueries(["me", "tags", "todos"]);
    },
  });
}
