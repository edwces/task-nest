import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/modules/user/user.service';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../../modules/user/enums/user-role.enum';
import { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const user = await this.userService.findOne({ id: request.user.sub });

    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
