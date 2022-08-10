import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Repeat } from '../enums/repeat.enum';

export class CreateTodoDTO {
  @IsNumber() @IsPositive() readonly authorId: number;
  @IsString() readonly label: string;
  @IsOptional() @IsArray() readonly tagIds?: number[];
  @IsOptional() @IsString() readonly description?: string;
  @IsOptional() @IsString() readonly expiresAt?: string;
  @IsOptional() @IsBoolean() isBookmarked: boolean;
  @IsOptional() @IsEnum(Repeat) repeat: Repeat;
}
