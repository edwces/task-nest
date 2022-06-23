import { UserRole } from 'src/shared/types/enums/user-role.enum';

export class CreateUserDTO {
  readonly email: string;
  readonly name: string;
  readonly password: string;
  readonly role? = UserRole.USER;
}
