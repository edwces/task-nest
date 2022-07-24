import { useQuery } from "react-query";
import { http } from "../../../config/httpClient";
import { TodosQueryParamsDTO } from "../dto/todos-query-params.dto";
import { Todo } from "../models/todo.model";
function getTodos(query: TodosQueryParamsDTO) {
  return http
    .get<Todo[]>("me/todos", { params: query })
    .then((response) => response.data);
}

export function useTodos(query: TodosQueryParamsDTO) {
  return useQuery(["me", "todos", query], () => getTodos(query));
}
