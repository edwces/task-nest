import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class ResetPasswordFieldsDTO {
  @IsString() @IsEmail() @MaxLength(100) email: string;
  @IsString() code: string;
  @IsString() @Length(5, 50) password: string;
}
