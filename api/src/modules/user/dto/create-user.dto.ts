import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/shared/types/enums/user-role.enum';

export class CreateUserDTO {
  @IsEmail() readonly email: string;
  @IsNotEmpty() readonly name: string;
  @IsNotEmpty() readonly password: string;
  readonly role? = UserRole.USER;
}
