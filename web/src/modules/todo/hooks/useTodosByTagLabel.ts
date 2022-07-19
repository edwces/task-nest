import { useQuery } from "react-query";
import { getTodosByTagLabel } from "../services/todo.service";
import { TodosQuery } from "../types/todos-query.interface";

// TODO: Dont expose enabled
export function useTodosByTagLabel(
  label: string,
  query: TodosQuery,
  { enabled }: { enabled: boolean }
) {
  return useQuery(
    ["me", "tags", "todos", label, query],
    () => getTodosByTagLabel(label, query),
    { enabled }
  );
}
