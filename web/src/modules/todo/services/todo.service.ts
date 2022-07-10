import { http } from "../../../config/httpClient";
import { AddTodoDTO } from "../dto/add-todo.dto";
import { Todo } from "../models/todo.model";
import { TodosQuery } from "../types/add-todo-query.interface";

export function createTodo(data: AddTodoDTO) {
  return http.post("users/me/todos", data).then((response) => response.data);
}

export function getTodos(query: TodosQuery): Promise<Todo[]> {
  return http
    .get("users/me/todos", { params: query })
    .then((response) => response.data);
}

export function removeTodo(id: number) {
  return http.delete(`users/me/todos/${id}`);
}
