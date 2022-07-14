import { IsEnum, IsOptional, IsString } from 'class-validator';
import { QueryOrder } from 'src/common/enums/query-order.enum';
import { Todo } from '../todo.entity';

export class FindAllTodosQueryParamsDTO {
  @IsOptional() @IsString() readonly sort?: keyof Todo;
  @IsOptional() @IsEnum(QueryOrder) readonly direction?: QueryOrder;
}
