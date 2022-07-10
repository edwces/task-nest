import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/modules/user/enums/user-role.enum';
import { JWTAccessGuard } from '../auth/guards/jwt-access.guard';
import { JWTAccessPayload } from '../auth/interfaces/jwt-access-payload.interface';
import { TodosQueryParams } from '../todo/interfaces/todos-query-params.interface';
import { CreateUserTodoDTO } from './dto/create-user-todo.dto';
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
  findByToken(@User() user: JWTAccessPayload) {
    return this.userService.findOne(user.sub);
  }

  @Get('me/todos')
  @UseGuards(JWTAccessGuard)
  findTodosByToken(
    @User() user: JWTAccessPayload,
    @Query() query: TodosQueryParams,
  ) {
    return this.userService.findTodosById(user.sub, query);
  }

  @Post('me/todos')
  @UseGuards(JWTAccessGuard)
  createTodo(@User() user: JWTAccessPayload, @Body() dto: CreateUserTodoDTO) {
    return this.userService.createTodo({
      authorId: user.sub,
      label: dto.label,
    });
  }

  @Delete('me/todos/:id')
  @UseGuards(JWTAccessGuard)
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteTodo(id);
  }
}
