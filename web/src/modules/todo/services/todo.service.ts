import { http } from "../../../config/httpClient";
import { AddTodoDTO } from "../components/TodoCreator";
import { Todo } from "../models/todo.model";
import { TodosQuery } from "../types/todos-query.interface";

export function createTodo(data: AddTodoDTO) {
  return http.post("me/todos", data).then((response) => response.data);
}

export function getTodos(query: TodosQuery): Promise<Todo[]> {
  return http
    .get("me/todos", { params: query })
    .then((response) => response.data);
}

export function getTodosByTagLabel(
  label: string,
  query: TodosQuery
): Promise<Todo[]> {
  return http
    .get(`me/tags/${label}/todos`, { params: query })
    .then((response) => response.data);
}

export function removeTodo(id: number) {
  return http.delete(`me/todos/${id}`);
}

export function getTodoById(id: number): Promise<Todo> {
  return http.get(`me/todos/${id}`).then((response) => response.data);
}

export function updateTodo(id: number, dto: Partial<Todo>) {
  return http.patch(`me/todos/${id}`, dto);
}
