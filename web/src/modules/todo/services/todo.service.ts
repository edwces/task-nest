import { http } from "../../../config/httpClient";
import { AddTodoDTO } from "../dto/add-todo.dto";
import { Todo } from "../models/todo.model";

export function createTodo(data: AddTodoDTO) {
  return http.post("users/me/todos", data).then((response) => response.data);
}

export function getTodos(): Promise<Todo[]> {
  return http.get("users/me/todos").then((response) => response.data);
}

export function removeTodo(id: number) {
  return http.delete(`users/me/todos/${id}`);
}
