import { FilterQuery, wrap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import * as argon2 from 'argon2';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(where: FilterQuery<User>) {
    return await this.userRepository.findOne(where);
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneOrFail(id);
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneOrFail({ email });
  }

  async create({ password, ...dto }: CreateUserDTO) {
    const hash = await argon2.hash(password);
    const user = this.userRepository.create({ ...dto, hash });
    await this.userRepository.persistAndFlush(user);

    return user;
  }

  //TODO: try setting password on domain entity instead of service
  async updatePasswordById(id: number, password: string) {
    const user = await this.findOneById(id);
    const newHash = await argon2.hash(password);
    wrap(user).assign({ hash: newHash });
    this.userRepository.flush();
  }
}
