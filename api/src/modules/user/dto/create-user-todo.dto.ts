import { IsString } from 'class-validator';

export class CreateUserTodoDTO {
  @IsString() readonly label: string;
}
