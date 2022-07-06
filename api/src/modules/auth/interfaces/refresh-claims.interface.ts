import { UserRole } from 'src/common/types/enums/user-role.enum';

export interface RefreshClaims {
  sub: number;
  email: string;
  exp: number;
  role: UserRole;
}
