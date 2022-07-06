import { http } from "../../../config/httpClient";
import { AddTodoDTO } from "../dto/add-todo.dto";
import { Todo } from "../models/todo.model";

export function createTodo(data: AddTodoDTO) {
  return http.post("user/me/todos", { data });
}

export function getTodos(): Promise<Todo[]> {
  return http.get("user/me/todos");
}

export function removeTodo(id: number) {
  return http.delete(`user/me/todos/${id}`);
}
