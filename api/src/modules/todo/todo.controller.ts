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
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/modules/user/enums/user-role.enum';
import { JWTAccessGuard } from '../auth/guards/jwt-access.guard';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodosQueryParams } from './interfaces/todos-query-params.interface';
import { TodoService } from './todo.service';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(JWTAccessGuard, RolesGuard)
  findAll(@Query() query: TodosQueryParams) {
    return this.todoService.findAll({}, query);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JWTAccessGuard, RolesGuard)
  create(@Body() dto: CreateTodoDTO) {
    return this.todoService.create(dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JWTAccessGuard, RolesGuard)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.delete(id);
  }
}
