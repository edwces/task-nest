import { FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findOne(filter: FilterQuery<User>): Promise<User | undefined> {
    return await this.userRepository.findOne(filter);
  }

  async create(dto: CreateUserDTO): Promise<User> {
    const hash = await argon2.hash(dto.password);
    const user = this.userRepository.create({ ...dto, hash });
    await this.userRepository.persistAndFlush(user);

    return user;
  }
}
