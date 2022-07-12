import { IsOptional, IsString } from 'class-validator';

export class CreateUserTodoDTO {
  @IsString() readonly label: string;
  @IsOptional() readonly tagId?: number;
}
