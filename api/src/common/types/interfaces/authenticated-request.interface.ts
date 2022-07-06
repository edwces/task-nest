import { Request } from 'express';
import { AccessClaims } from '../../../modules/auth/interfaces/access-claims.interface';

export interface AuthenticatedRequest extends Request {
  user: AccessClaims;
}
