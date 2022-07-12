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
import { SessionUser } from '../auth/interfaces/session-user.interface';
import { CreateTagDTO } from '../tag/dto/create-tag.dto';
import { FindAllTodosQueryParamsDTO } from '../todo/dto/find-all-todos-query-params.dto';
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
  findByToken(@User() user: SessionUser) {
    return this.userService.findOne(user.id);
  }

  @Get('me/todos')
  @UseGuards(JWTAccessGuard)
  findTodosByToken(
    @User() user: SessionUser,
    @Query() query: FindAllTodosQueryParamsDTO,
  ) {
    return this.userService.findTodosById(user.id, query);
  }

  @Post('me/todos')
  @UseGuards(JWTAccessGuard)
  createTodo(@User() user: SessionUser, @Body() dto: CreateUserTodoDTO) {
    return this.userService.createTodo({
      authorId: user.id,
      tagId: dto.tagId,
      label: dto.label,
    });
  }

  @Delete('me/todos/:id')
  @UseGuards(JWTAccessGuard)
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteTodo(id);
  }

  @Post('me/tags')
  @UseGuards(JWTAccessGuard)
  createTag(
    @User() user: SessionUser,
    @Body() dto: Omit<CreateTagDTO, 'authorId'>,
  ) {
    return this.userService.createTag({ ...dto, authorId: user.id });
  }

  @Get('me/tags/:id/todos')
  @UseGuards(JWTAccessGuard)
  getTodosByTag(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getTodosByTag(id);
  }
}
