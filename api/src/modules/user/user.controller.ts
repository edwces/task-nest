import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Private } from 'src/common/decorators/private.decorator';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Private()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }

  @Post()
  create(@Body() dto: CreateUserDTO) {
    return this.userService.create(dto);
  }
}
