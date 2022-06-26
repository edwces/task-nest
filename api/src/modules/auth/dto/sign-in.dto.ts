import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  @MaxLength(100)
  readonly email: string;

  @IsString()
  @Length(5, 50)
  readonly password: string;
}
