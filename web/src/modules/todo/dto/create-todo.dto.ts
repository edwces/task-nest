export interface CreateTodoDTO {
  label: string;
  tagIds?: number[];
  description?: string;
  expiresAt?: Date;
}
