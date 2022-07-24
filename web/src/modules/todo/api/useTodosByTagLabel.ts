import { useQuery } from "react-query";
import { http } from "../../../config/httpClient";
import { TodosQueryParamsDTO } from "../dto/todos-query-params.dto";
import { Todo } from "../models/todo.model";

type TodosByTagLabelParams = { label: string; query?: TodosQueryParamsDTO };

function getTodosByTagLabel({ label, query }: TodosByTagLabelParams) {
  return http
    .get<Todo[]>(`me/tags/${label}/todos`, { params: query })
    .then((response) => response.data);
}

export function useTodosByTagLabel(
  { label, query }: TodosByTagLabelParams,
  { enabled }: { enabled: boolean }
) {
  return useQuery(
    ["me", "tags", "todos", label, query],
    () => getTodosByTagLabel({ label, query }),
    { enabled }
  );
}
