import { Todo } from "../models/todo.model";

export interface TodosQuery {
  sort?: string;
  direction?: string;
}
