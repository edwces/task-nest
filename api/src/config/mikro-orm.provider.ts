import { Options } from '@mikro-orm/core';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { NotFoundException } from '@nestjs/common';

const MikroOrmConfig = {
  type: 'postgresql',
  host: process.env['DB_HOST'],
  password: process.env['DB_PASSWORD'],
  user: process.env['DB_USER'],
  dbName: process.env['DB_NAME'],
  entities: ['dist/**/*.entity.js'],
  migrations: {
    path: 'migrations',
    pathTs: 'migrations',
  },
  debug: true,
  findOneOrFailHandler: (entityName: string) =>
    new NotFoundException(`${entityName} was not found`),
} as Options;

export const mikroOrmProvider = MikroOrmConfig as MikroOrmModuleSyncOptions;

export default MikroOrmConfig;
