import { Todo } from "../models/todo.model";

export interface TodosQuery {
  sort?: keyof Todo;
  order?: "asc" | "desc";
}
