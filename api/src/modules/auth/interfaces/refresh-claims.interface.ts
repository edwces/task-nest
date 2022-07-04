import { UserRole } from 'src/common/types/enums/user-role.enum';

export interface RefreshClaims {
  exp: number;
  sub: number;
  email: string;
  role: UserRole;
}
