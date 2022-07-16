import { IsEmail, MaxLength } from 'class-validator';

export class ResetCodeFieldsDTO {
  @IsEmail() @MaxLength(100) readonly email: string;
}
