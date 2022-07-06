import { http } from "../../../config/httpClient";
import { AddTodoDTO } from "../dto/add-todo.dto";

export function createTodo(data: AddTodoDTO) {
  return http.post("user/me/todos", { data });
}

export function getTodos() {
  return http.get("user/me/todos");
}
