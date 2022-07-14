import { QBFilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { QueryOrder } from 'src/common/enums/query-order.enum';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { FindAllTodosQueryParamsDTO } from './dto/find-all-todos-query-params.dto';
import { Todo } from './todo.entity';

// TODO: Find a way to make relations and query params
// TODO: Easily distributed among all functions
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: EntityRepository<Todo>,
  ) {}

  async findAll(query: FindAllTodosQueryParamsDTO) {
    return this.findByOptions(query);
  }

  async findByUserId(id: number, query: FindAllTodosQueryParamsDTO) {
    return this.findByOptions(query, { author: id });
  }

  private async findByOptions(
    { sort, direction = QueryOrder.ASC }: FindAllTodosQueryParamsDTO,
    where?: QBFilterQuery<Todo>,
  ) {
    const em = this.todoRepository
      .createQueryBuilder('t')
      .select('*')
      .leftJoinAndSelect('t.tag', 'g');
    if (where) em.where(where);
    if (sort) em.orderBy({ [sort]: direction });
    return await em.getResult();
  }

  async create({ authorId, tagId, ...dto }: CreateTodoDTO) {
    const todo = this.todoRepository.create({
      author: authorId,
      tag: tagId,
      ...dto,
    });
    await this.todoRepository.persistAndFlush(todo);
  }

  async delete(id: number) {
    const todo = await this.todoRepository.findOneOrFail(id);
    await this.todoRepository.removeAndFlush(todo);
  }

  async findByTagLabel(
    id: number,
    label: string,
    query: FindAllTodosQueryParamsDTO,
  ) {
    return await this.findByOptions(query, { tag: { author: id, label } });
  }
}
