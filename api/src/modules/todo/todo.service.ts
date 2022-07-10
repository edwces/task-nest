import { QBFilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodosQueryParams } from './interfaces/todos-query-params.interface';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: EntityRepository<Todo>,
  ) {}

  async findAll(
    where: QBFilterQuery<Todo>,
    { sort, direction = 'asc' }: TodosQueryParams,
  ) {
    const em = this.todoRepository.createQueryBuilder().select('*');

    if (where) em.where(where);
    if (sort) em.orderBy({ [sort]: direction });

    return await em.getResult();
  }

  async create({ authorId, ...dto }: CreateTodoDTO) {
    const todo = this.todoRepository.create({ author: authorId, ...dto });
    await this.todoRepository.persistAndFlush(todo);
    return todo;
  }

  async delete(id: number) {
    const todo = await this.todoRepository.findOneOrFail(id);
    await this.todoRepository.removeAndFlush(todo);
  }
}
