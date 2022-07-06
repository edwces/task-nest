import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UserRole } from 'src/common/types/enums/user-role.enum';
import { AccessClaims } from '../auth/interfaces/access-claims.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth(UserRole.ADMIN)
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() dto: CreateUserDTO) {
    return this.userService.create(dto);
  }

  @Get('me')
  @Auth()
  getByToken(@User() user: AccessClaims) {
    return this.userService.findOne(user.sub);
  }
}
