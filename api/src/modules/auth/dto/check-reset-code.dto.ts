import { IsEmail, MaxLength, IsString, Length } from 'class-validator';

export class CheckResetCodeDTO {
  @IsEmail() @MaxLength(100) email: string;
  @IsString() @Length(7, 9) code: string;
}
