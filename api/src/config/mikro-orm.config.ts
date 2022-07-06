import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/modules/user/user.entity';

export default {
  type: 'postgresql',
  host: 'postgres',
  password: 'password',
  user: 'postgres',
  dbName: 'postgres',
  entitiesTs: [User],
  entities: ['dist/**/*.entity.js'],
  findOneOrFailHandler: (entityName: string) =>
    new NotFoundException(`${entityName} was not found`),
} as MikroOrmModuleSyncOptions;
