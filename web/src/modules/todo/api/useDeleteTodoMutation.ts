import { useMutation, useQueryClient } from "react-query";
import { http } from "../../../config/httpClient";

function deleteTodo(id: number) {
  return http.delete<void>(`me/todos/${id}`);
}

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation((id: number) => deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["me", "todos"]);
      queryClient.invalidateQueries(["me", "tags", "todos"]);
    },
  });
}
