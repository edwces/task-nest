import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Todo } from '../todo/todo.entity';
import { CreateTagDTO } from './dto/create-tag.dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: EntityRepository<Tag>,
    @InjectRepository(Todo)
    private readonly todoRepository: EntityRepository<Todo>,
  ) {}

  async findAll() {
    return await this.tagRepository.findAll();
  }

  async create({ authorId, ...dto }: CreateTagDTO) {
    const tag = this.tagRepository.create({ author: authorId, ...dto });
    await this.tagRepository.persistAndFlush(tag);
    return tag;
  }

  async addTodo(id: number, todoId: number) {
    const tag = await this.tagRepository.findOneOrFail(id);
    const todo = await this.todoRepository.findOneOrFail(todoId);
    tag.todos.add(todo);
    await this.tagRepository.flush();
  }
  async getTodosById(id: number) {
    const todo = await this.tagRepository.findOneOrFail(id, {
      populate: ['todos'],
    });
    return todo.todos;
  }
}
