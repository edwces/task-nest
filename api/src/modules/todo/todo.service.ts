import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, QueryBuilder } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { QueryOrder } from 'src/common/enums/query-order.enum';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { FindAllTodosQueryParamsDTO } from './dto/find-all-todos-query-params.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: EntityRepository<Todo>,
  ) {}

  async findAll(query: FindAllTodosQueryParamsDTO) {
    const qb = this.todoRepository
      .createQueryBuilder()
      .select('*')
      .leftJoinAndSelect('tags', 'g');
    return this.applyFilters(qb, query).getResult();
  }

  async findByUserId(id: number, query: FindAllTodosQueryParamsDTO) {
    const qb = this.todoRepository
      .createQueryBuilder()
      .select('*')
      .leftJoinAndSelect('tags', 'g')
      .where({ author: id });
    return this.applyFilters(qb, query).getResult();
  }

  async findByTagLabel(
    id: number,
    label: string,
    query: FindAllTodosQueryParamsDTO,
  ) {
    const qb = this.todoRepository
      .createQueryBuilder()
      .select('*')
      .where({ tags: { label } })
      .andWhere({ author: id });

    // get all the todos that match conditions then populate all tags
    const todos = await this.applyFilters(qb, query).getResult();
    return this.todoRepository.populate(todos, ['tags']);
  }

  private applyFilters(
    qb: QueryBuilder<Todo>,
    filters: FindAllTodosQueryParamsDTO,
  ) {
    const { due, sort, direction = QueryOrder.ASC, isBookmarked } = filters;

    if (isBookmarked ?? false) qb.andWhere({ isBookmarked });
    if (due) {
      if (due === 'today')
        qb.andWhere(`
            to_char("expires_at", 'HH:MM:DD') = to_char(CURRENT_DATE, 'HH:MM:DD') 
          `);
      else if (due === 'week')
        qb.andWhere(
          `to_char("expires_at", 'IW') = to_char(CURRENT_DATE, 'IW')`,
        );
    }
    if (sort) qb.orderBy({ [sort]: direction });

    return qb;
  }

  async create({ authorId, tagIds, expiresAt, ...dto }: CreateTodoDTO) {
    const serializedDate = expiresAt && new Date(expiresAt);
    if (expiresAt) serializedDate.setDate(serializedDate.getDate() + 1);
    const todo = this.todoRepository.create({
      author: authorId,
      tags: tagIds,
      expiresAt: serializedDate,
      ...dto,
    });
    await this.todoRepository.persistAndFlush(todo);
  }

  async delete(id: number) {
    const todo = await this.todoRepository.findOneOrFail(id);
    await this.todoRepository.removeAndFlush(todo);
  }

  async updateByUserIdAndId(
    userId: number,
    id: number,
    { tagIds, expiresAt, ...dto }: UpdateTodoDTO,
  ) {
    const serializedDate = expiresAt && new Date(expiresAt);
    if (expiresAt) serializedDate.setDate(serializedDate.getDate() + 1);
    const todo = await this.findByUserIdAndId(userId, id);
    const values = {
      ...dto,
      tags: tagIds ? tagIds : todo.tags,
      expiresAt: serializedDate !== undefined ? serializedDate : todo.expiresAt,
    };
    wrap(todo).assign(values);

    await this.todoRepository.flush();
  }

  async findByUserIdAndId(userId: number, id: number) {
    const todo = await this.todoRepository.findOneOrFail(
      {
        author: userId,
        id,
      },
      { populate: ['tags'] },
    );
    return todo;
  }
}
