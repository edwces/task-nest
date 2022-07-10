import { FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import * as argon2 from 'argon2';
import { TodoService } from '../todo/todo.service';
import { CreateTodoDTO } from '../todo/dto/create-todo.dto';
import { TodosQueryParams } from '../todo/interfaces/todos-query-params.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly todoService: TodoService,
  ) {}

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(filter: FilterQuery<User>) {
    return await this.userRepository.findOne(filter);
  }

  async create({ password, ...dto }: CreateUserDTO) {
    const hash = await argon2.hash(password);
    const user = this.userRepository.create({ ...dto, hash });
    await this.userRepository.persistAndFlush(user);

    return user;
  }

  async findTodosById(id: number, query: TodosQueryParams) {
    return await this.todoService.findAll({ author: id }, query);
  }

  async createTodo(dto: CreateTodoDTO) {
    return await this.todoService.create(dto);
  }

  async deleteTodo(id: number) {
    return await this.todoService.delete(id);
  }
}
