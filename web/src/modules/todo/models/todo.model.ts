import { Tag } from "../../navigation/models/tag.model";

export interface Todo {
  id: number;
  label: string;
  tag: null | Tag;
  description: string;
}
