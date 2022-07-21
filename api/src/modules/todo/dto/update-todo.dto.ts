import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateTodoDTO {
  @IsOptional() @IsNumber() @IsPositive() readonly authorId?: number;
  @IsOptional() @IsString() readonly label?: string;
  @IsOptional() @IsNumber() @IsPositive() readonly tagId?: number;
  @IsOptional() @IsString() readonly description?: string;
}
