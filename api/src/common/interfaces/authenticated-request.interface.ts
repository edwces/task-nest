import { Request } from 'express';
import { JWTAccessPayload } from '../../modules/auth/interfaces/jwt-access-payload.interface';

export interface AuthenticatedRequest extends Request {
  user: JWTAccessPayload;
}
