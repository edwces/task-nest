import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Private } from '../../common/decorators/private.decorator';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { FindAllTodosQueryParamsDTO } from './dto/find-all-todos-query-params.dto';
import { TodoService } from './todo.service';

@Private()
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(@Query() query: FindAllTodosQueryParamsDTO) {
    return this.todoService.findAll(query);
  }

  @Post()
  create(@Body() dto: CreateTodoDTO) {
    return this.todoService.create(dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.removeById(id);
  }
}
