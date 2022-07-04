import { UserRole } from '../../../common/types/enums/user-role.enum';

export interface AccessClaims {
  sub: number;
  email: string;
  exp: number;
  role: UserRole;
}
