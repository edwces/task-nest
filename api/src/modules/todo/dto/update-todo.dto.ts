import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateTodoDTO {
  @IsOptional() @IsNumber() @IsPositive() readonly authorId?: number;
  @IsOptional() @IsString() readonly label?: string;
  @IsOptional() @IsArray() readonly tagIds?: number[];
  @IsOptional() @IsString() readonly description?: string;
}
