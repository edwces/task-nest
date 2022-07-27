import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  readonly name: string;

  @IsEmail()
  @MaxLength(100)
  readonly email: string;

  @IsString()
  @Length(5, 50)
  readonly password: string;
}
