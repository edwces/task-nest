import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateTodoDTO {
  @IsNumber() @IsPositive() readonly authorId: number;
  @IsString() readonly label: string;
  @IsOptional() @IsNumber() @IsPositive() readonly tagId?: number;
}
