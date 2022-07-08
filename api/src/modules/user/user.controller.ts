import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/modules/user/enums/user-role.enum';
import { JWTAccessGuard } from '../auth/guards/jwt-access.guard';
import { JWTAccessPayload } from '../auth/interfaces/jwt-access-payload.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(JWTAccessGuard, RolesGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JWTAccessGuard, RolesGuard)
  create(@Body() dto: CreateUserDTO) {
    return this.userService.create(dto);
  }

  @Get('me')
  @UseGuards(JWTAccessGuard)
  getByToken(@User() user: JWTAccessPayload) {
    return this.userService.findOne(user.sub);
  }
}
