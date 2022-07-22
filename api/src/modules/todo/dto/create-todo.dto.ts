import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTodoDTO {
  @IsNumber() @IsPositive() readonly authorId: number;
  @IsString() readonly label: string;
  @IsOptional() @IsArray() readonly tagIds?: number[];
  @IsOptional() @IsString() readonly description?: string;
}
