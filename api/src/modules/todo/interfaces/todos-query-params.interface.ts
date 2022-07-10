import { Todo } from '../todo.entity';

export interface TodosQueryParams {
  sort?: keyof Todo;
  direction?: 'asc' | 'desc' | 'ASC' | 'DESC';
}
