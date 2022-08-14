import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, QueryBuilder } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { QueryOrder } from 'src/common/enums/query-order.enum';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { FindAllTodosQueryParamsDTO } from './dto/find-all-todos-query-params.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { Repeat } from './enums/repeat.enum';
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

  async findByUser(id: number, query: FindAllTodosQueryParamsDTO) {
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
    const {
      due,
      sort,
      direction = QueryOrder.ASC,
      isBookmarked,
      isChecked,
      isExpired,
    } = filters;

    if (isBookmarked !== undefined) qb.andWhere({ isBookmarked });
    if (isChecked !== undefined) qb.andWhere({ isChecked });
    if (isExpired !== undefined) {
      const now = new Date();
      now.setDate(now.getDate() - 1);
      // isExpired is not parsed as boolean
      if ((isExpired as unknown as string) === 'true')
        qb.andWhere({ expiresAt: { $lte: now } });
      else
        qb.andWhere({
          $or: [{ expiresAt: { $gte: now } }, { expiresAt: null }],
        });
    }

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

  async removeByUserAndId(userId: number, id: number) {
    const todo = await this.findOneByUserAndId(userId, id);
    await this.todoRepository.removeAndFlush(todo);
  }

  async tickByUserAndId(userId: number, id: number) {
    const todo = await this.findOneByUserAndId(userId, id);
    if (todo.repeat === Repeat.NONE) {
      return await this.todoRepository.removeAndFlush(todo);
    } else {
      todo.isChecked = true;
      await this.todoRepository.flush();
    }
  }

  async removeById(id: number) {
    const todo = await this.todoRepository.findOne(id);
    await this.todoRepository.removeAndFlush(todo);
  }
  async create({ authorId, tagIds, expiresAt, repeat, ...dto }: CreateTodoDTO) {
    const todo = this.todoRepository.create({
      author: authorId,
      tags: tagIds,
      expiresAt:
        expiresAt !== undefined ? this.serializeDate(expiresAt) : undefined,
      repeat,
      ...dto,
    });
    await this.todoRepository.persistAndFlush(todo);
  }

  private serializeDate(iso: string) {
    const date = new Date(iso);
    date.setDate(date.getDate() + 1);
    return date;
  }

  async updateByUserAndId(
    userId: number,
    id: number,
    { tagIds, expiresAt, repeat, ...dto }: UpdateTodoDTO,
  ) {
    const todo = await this.findOneByUserAndId(userId, id);

    wrap(todo).assign({
      tags: tagIds || todo.tags,
      expiresAt:
        expiresAt !== undefined
          ? expiresAt && this.serializeDate(expiresAt)
          : todo.expiresAt,
      repeat: repeat !== undefined ? repeat : todo.repeat,
      ...dto,
    });

    await this.todoRepository.flush();
  }

  async findOneByUserAndId(userId: number, id: number) {
    return this.todoRepository.findOneOrFail(
      {
        author: userId,
        id,
      },
      { populate: ['tags'] },
    );
  }
}
