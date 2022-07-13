import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { QueryOrder } from 'src/common/enums/query-order.enum';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { FindAllTodosQueryParamsDTO } from './dto/find-all-todos-query-params.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: EntityRepository<Todo>,
  ) {}

  async findAll({
    sort,
    direction = QueryOrder.ASC,
  }: FindAllTodosQueryParamsDTO) {
    const em = this.todoRepository.createQueryBuilder().select('*');
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

  async findByUserId(id: number) {
    return await this.todoRepository.find({ author: id });
  }
}
