import { applyDecorators, UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/modules/auth/guards/access.guard';
import { RolesGuard } from '../guards/roles.guard';
import { UserRole } from '../types/enums/user-role.enum';
import { Roles } from './roles.decorator';

export const Auth = (role?: UserRole) => {
  return applyDecorators(Roles(role), UseGuards(AccessGuard, RolesGuard));
};
