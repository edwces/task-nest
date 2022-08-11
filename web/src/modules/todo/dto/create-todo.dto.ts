import { Repeat } from "../../dates/enums/repeat.enum";

export interface CreateTodoDTO {
  label: string;
  tagIds?: number[];
  description?: string;
  expiresAt?: Date | null;
  isBookmarked?: boolean;
  repeat?: Repeat;
}
