import { QBFilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { QueryOrder } from 'src/common/enums/query-order.enum';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { FindAllTodosQueryParamsDTO } from './dto/find-all-todos-query-params.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
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
    {
      due,
      sort,
      direction = QueryOrder.ASC,
      isBookmarked,
    }: FindAllTodosQueryParamsDTO,
    where?: QBFilterQuery<Todo>,
  ) {
    const em = this.todoRepository
      .createQueryBuilder('t')
      .select('*')
      .leftJoinAndSelect('t.tags', 'g');
    if (isBookmarked !== undefined) em.where({ isBookmarked });
    if (where) em.andWhere(where);
    if (due) {
      switch (due) {
        case 'today':
          em.andWhere(`
            to_char("t"."expires_at", 'HH:MM:DD') = to_char(CURRENT_DATE, 'HH:MM:DD') 
          `);
          break;
        case 'week':
          em.andWhere(
            `to_char("t"."expires_at", 'IW') = to_char(CURRENT_DATE, 'IW')`,
          );
      }
    }
    if (sort) em.orderBy({ [sort]: direction });
    return await em.getResult();
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

  // TODO: Try making this better by using findByOptions better
  async findByTagLabel(
    id: number,
    label: string,
    query: FindAllTodosQueryParamsDTO,
  ) {
    const todos = await this.findByOptions(query, { author: id });
    const results = await Promise.all(
      todos.map(async (todo) => {
        const match = await todo.tags.matching({ where: { label } });
        console.log(match.length === 0);
        return match.length !== 0;
      }),
    );
    return todos.filter((_, i) => results[i]);
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
      expiresAt: serializedDate || todo.expiresAt,
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
