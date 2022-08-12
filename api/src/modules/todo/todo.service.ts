import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, QueryBuilder } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
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
    private readonly schedulerRegistry: SchedulerRegistry,
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
    } = filters;

    if (isBookmarked ?? false) qb.andWhere({ isBookmarked });
    if (isChecked ?? false) qb.andWhere({ isChecked });
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

  private async addRepeatJob(userId: number, id: number, repeat: Repeat) {
    const job = new CronJob(this.repeatToCronTime(repeat), async () => {
      const todo = await this.findOneByUserAndId(userId, id);
      if (todo.expiresAt) this.addRepeatDateInterval(todo.expiresAt, repeat);
      todo.isChecked = false;
      await this.todoRepository.flush();
    });

    this.schedulerRegistry.addCronJob(`TODO_${id}_REPEAT`, job);
    job.start();
  }

  private repeatToCronTime(type: Repeat) {
    switch (type) {
      case Repeat.DAILY:
        return '0 0 * * * *';
      case Repeat.WEEKLY:
        return '0 0 * * 0 *';
      case Repeat.MONTHLY:
        return '0 0 1 * * *';
      default:
        throw new Error('Incorrect type');
    }
  }

  private addRepeatDateInterval(date: Date, type: Repeat) {
    switch (type) {
      case Repeat.DAILY:
        date.setDate(date.getDate() + 1);
        break;
      case Repeat.WEEKLY:
        date.setDate(date.getDate() + 7);
        break;
      case Repeat.MONTHLY:
        date.setMonth(date.getMonth() + 1);
    }
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
    if (todo.repeat !== Repeat.NONE)
      this.addRepeatJob(authorId, todo.id, repeat);
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

    if (repeat && repeat !== todo.repeat) {
      this.schedulerRegistry.deleteCronJob(`TODO_${id}_REPEAT`);
      if (repeat !== Repeat.NONE) this.addRepeatJob(userId, id, repeat);
    }
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
