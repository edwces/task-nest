import { useMutation, useQueryClient } from "react-query";
import { http } from "../../../config/httpClient";

function removeTodo(id: number) {
  return http.delete<void>(`me/todos/${id}`);
}

export function useRemoveTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation((id: number) => removeTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["me", "todos"]);
      queryClient.invalidateQueries(["me", "tags", "todos"]);
    },
  });
}
