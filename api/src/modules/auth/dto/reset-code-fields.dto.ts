import { IsEmail, IsString } from 'class-validator';

export class ResetCodeFieldsDTO {
  @IsString() @IsEmail() readonly email: string;
}
