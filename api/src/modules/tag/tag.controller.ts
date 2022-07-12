import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateTagDTO } from './dto/create-tag.dto';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Post()
  create(@Body() dto: CreateTagDTO) {
    return this.tagService.create(dto);
  }

  @Post(':id/todos')
  addTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body('todoId', ParseIntPipe) todoId: number,
  ) {
    return this.tagService.addTodo(id, todoId);
  }

  @Get(':id/todos')
  getTodosById(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.getTodosById(id);
  }
}
