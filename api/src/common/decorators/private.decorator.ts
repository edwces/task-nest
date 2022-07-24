import { applyDecorators, UseGuards } from '@nestjs/common';
import { JWTAccessGuard } from 'src/modules/auth/guards/jwt-access.guard';
import { UserRole } from 'src/modules/user/enums/user-role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';

export const Private = () =>
  applyDecorators(Roles(UserRole.ADMIN), UseGuards(JWTAccessGuard, RolesGuard));
