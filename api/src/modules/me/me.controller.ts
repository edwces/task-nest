import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { JWTAccessGuard } from '../auth/guards/jwt-access.guard';
import { SessionUser } from '../auth/interfaces/session-user.interface';
import { CreateTagDTO } from '../tag/dto/create-tag.dto';
import { TagService } from '../tag/tag.service';
import { CreateTodoDTO } from '../todo/dto/create-todo.dto';
import { FindAllTodosQueryParamsDTO } from '../todo/dto/find-all-todos-query-params.dto';
import { UpdateTodoDTO } from '../todo/dto/update-todo.dto';
import { TodoService } from '../todo/todo.service';
import { UserService } from '../user/user.service';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('me')
@UseGuards(JWTAccessGuard)
export class MeController {
  constructor(
    private readonly todoService: TodoService,
    private readonly userService: UserService,
    private readonly tagService: TagService,
  ) {}

  @Get()
  getMyself(@User() user: SessionUser) {
    return this.userService.findOneById(user.id);
  }

  @SkipThrottle()
  @Get('todos')
  getTodos(
    @User() user: SessionUser,
    @Query() query: FindAllTodosQueryParamsDTO,
  ) {
    return this.todoService.findByUser(user.id, query);
  }

  @Get('todos/:id')
  getTodoById(
    @User() user: SessionUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todoService.findOneByUserAndId(user.id, id);
  }

  @Patch('todos/:id')
  update(
    @User() user: SessionUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTodoDTO,
  ) {
    return this.todoService.updateByUserAndId(user.id, id, dto);
  }

  @Post('todos')
  createTodo(
    @User() user: SessionUser,
    @Body() dto: Omit<CreateTodoDTO, 'authorId'>,
  ) {
    return this.todoService.create({ authorId: user.id, ...dto });
  }

  @Delete('todos/:id')
  deleteTodo(@User() user: SessionUser, @Param('id', ParseIntPipe) id: number) {
    return this.todoService.markAsCheckedByUserAndId(user.id, id);
  }

  @Get('tags')
  getTags(@User() user: SessionUser) {
    return this.tagService.findByUserId(user.id);
  }

  @Get('tags/:label')
  getTagByLabel(@User() user: SessionUser, @Param('label') label: string) {
    return this.tagService.findOneByUserLabel(user.id, label);
  }

  @SkipThrottle()
  @Get('tags/:label/todos')
  getTodosByTagLabel(
    @User() user: SessionUser,
    @Param('label') label: string,
    @Query() query: FindAllTodosQueryParamsDTO,
  ) {
    return this.todoService.findByTagLabel(user.id, label, query);
  }

  @Post('tags')
  createTag(
    @User() user: SessionUser,
    @Body() dto: Omit<CreateTagDTO, 'authorId'>,
  ) {
    return this.tagService.create({ authorId: user.id, ...dto });
  }

  @Delete('tags/:label')
  deleteTagByLabel(@User() user: SessionUser, @Param('label') label: string) {
    return this.tagService.deleteByUserLabel(user.id, label);
  }
}
