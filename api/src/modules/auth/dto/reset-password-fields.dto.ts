import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class ResetPasswordFieldsDTO {
  @IsEmail() @MaxLength(100) email: string;
  @IsString() @Length(7, 9) code: string;
  @IsString() @Length(5, 50) password: string;
}
