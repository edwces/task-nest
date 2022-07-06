import { useQuery } from "react-query";
import { getTodos } from "../services/todo.service";

export function useTodos() {
  return useQuery(["todos"], getTodos);
}
