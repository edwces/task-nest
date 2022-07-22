import { Tag } from "../../navigation/models/tag.model";

export interface Todo {
  id: number;
  label: string;
  tags: Tag[];
  description: string;
}
