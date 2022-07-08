import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: EntityRepository<Todo>,
  ) {}

  async findAll() {
    return await this.todoRepository.findAll();
  }

  async create({ authorId, ...dto }: CreateTodoDTO) {
    const todo = this.todoRepository.create({ author: authorId, ...dto });
    await this.todoRepository.persistAndFlush(todo);
    return todo;
  }

  async delete(id: number) {
    const todo = await this.todoRepository.findOne(id);
    await this.todoRepository.removeAndFlush(todo);
  }
}
