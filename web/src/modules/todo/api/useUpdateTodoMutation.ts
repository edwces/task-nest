import { useMutation, useQueryClient } from "react-query";
import { http } from "../../../config/httpClient";
import { UpdateTodoDTO } from "../dto/update-todo.dto";

type UpdateTodoParams = { id: number; data: UpdateTodoDTO };

function updateTodo({ id, data }: UpdateTodoParams) {
  return http.patch<void>(`me/todos/${id}`, data);
}

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, data }: UpdateTodoParams) => updateTodo({ id, data }),
    { onSuccess: () => queryClient.invalidateQueries(["me", "todos"]) }
  );
}
