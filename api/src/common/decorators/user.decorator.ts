import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JWTAccessPayload } from '../../modules/auth/interfaces/jwt-access-payload.interface';
import { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';

export const User = createParamDecorator(
  (data: keyof JWTAccessPayload, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return data ? user[data] : user;
  },
);
