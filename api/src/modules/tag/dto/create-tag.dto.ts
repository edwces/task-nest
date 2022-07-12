import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTagDTO {
  @IsString() readonly label: string;
  @IsNumber() @IsPositive() readonly authorId: number;
}
