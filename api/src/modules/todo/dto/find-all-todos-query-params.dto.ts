import { IsIn, IsEnum, IsString } from 'class-validator';
import { QueryOrder } from 'src/common/enums/query-order.enum';
import { Todo } from '../todo.entity';

export class FindAllTodosQueryParamsDTO {
  @IsString() @IsIn(Object.keys(Todo)) readonly sort?: keyof Todo;
  @IsEnum(QueryOrder) readonly direction?: QueryOrder;
}
