export interface CreateTodoDTO {
  label: string;
  tagIds?: string[];
  description?: string;
  expiresAt?: Date | null;
  isBookmarked?: boolean;
}
