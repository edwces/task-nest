import { useQuery } from "react-query";
import { getTodos } from "../services/todo.service";
import { TodosQuery } from "../types/add-todo-query.interface";

export function useTodos(query: TodosQuery) {
  return useQuery(["todos", query], () => getTodos(query));
}
