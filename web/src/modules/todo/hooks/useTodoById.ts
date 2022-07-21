import { useQuery } from "react-query";
import { getTodoById } from "../services/todo.service";

export function useTodoById(id: number) {
  return useQuery(["me", "todos", id], () => getTodoById(id));
}
