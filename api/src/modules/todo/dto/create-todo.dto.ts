import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTodoDTO {
  @IsNumber() @IsPositive() readonly authorId: number;
  @IsString() readonly label: string;
}
