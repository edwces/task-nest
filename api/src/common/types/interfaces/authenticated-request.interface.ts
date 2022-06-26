import { Request } from 'express';
import { UserPayload } from './user-payload';

export interface AuthenticatedRequest extends Request {
  user: UserPayload;
}
