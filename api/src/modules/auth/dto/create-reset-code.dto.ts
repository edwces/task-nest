import { IsEmail, MaxLength } from 'class-validator';

export class CreateResetCodeDTO {
  @IsEmail() @MaxLength(100) readonly email: string;
}
