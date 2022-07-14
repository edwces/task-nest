import { Tag } from "../../tag/models/tag.model";

export interface Todo {
  id: number;
  label: string;
  tag: null | Tag;
}
