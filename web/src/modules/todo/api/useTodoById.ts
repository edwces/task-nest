import { useQuery } from "react-query";
import { http } from "../../../config/httpClient";
import { Todo } from "../models/todo.model";
function getTodoById(id: number) {
  return http.get<Todo>(`me/todos/${id}`).then((response) => response.data);
}

export function useTodoById(id: number) {
  return useQuery(["me", "todos", id], () => getTodoById(id));
}
