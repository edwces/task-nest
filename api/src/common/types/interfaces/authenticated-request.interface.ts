import { Request } from 'express';
import { AccessClaims } from './access-claims.interface';

export interface AuthenticatedRequest extends Request {
  user: AccessClaims;
}
