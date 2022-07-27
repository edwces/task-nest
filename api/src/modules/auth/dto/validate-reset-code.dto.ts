import { IsEmail, MaxLength, IsString, Length } from 'class-validator';

export class ValidateResetCodeDTO {
  @IsEmail() @MaxLength(100) email: string;
  @IsString() @Length(7, 9) code: string;
}
