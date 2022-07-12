import { FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import * as argon2 from 'argon2';
import { TodoService } from '../todo/todo.service';
import { CreateTodoDTO } from '../todo/dto/create-todo.dto';
import { TagService } from '../tag/tag.service';
import { CreateTagDTO } from '../tag/dto/create-tag.dto';
import { FindAllTodosQueryParamsDTO } from '../todo/dto/find-all-todos-query-params.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly todoService: TodoService,
    private readonly tagService: TagService,
  ) {}

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(where: FilterQuery<User>) {
    return await this.userRepository.findOne(where);
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneOrFail(id);
  }

  async create({ password, ...dto }: CreateUserDTO) {
    const hash = await argon2.hash(password);
    const user = this.userRepository.create({ ...dto, hash });
    await this.userRepository.persistAndFlush(user);

    return user;
  }

  // TODO: NOT WORKING
  async findTodosById(id: number, query: FindAllTodosQueryParamsDTO) {
    return await this.todoService.findAll(query);
  }

  async createTodo(dto: CreateTodoDTO) {
    return await this.todoService.create(dto);
  }

  async deleteTodo(id: number) {
    return await this.todoService.delete(id);
  }

  async createTag(dto: CreateTagDTO) {
    return await this.tagService.create(dto);
  }

  async getTodosByTag(id: number) {
    return this.tagService.getTodosById(id);
  }
}
