import { useMutation, useQueryClient } from "react-query";
import { AddTodoDTO } from "../components/TodoCreator";
import { updateTodo } from "../services/todo.service";

type UpdateTodoMutationDTO = { id: number; dto: Partial<AddTodoDTO> };

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, dto }: UpdateTodoMutationDTO) => updateTodo(id, dto),
    { onSuccess: () => queryClient.invalidateQueries(["me", "todos"]) }
  );
}
