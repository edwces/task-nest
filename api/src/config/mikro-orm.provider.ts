import { Options } from '@mikro-orm/core';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { NotFoundException } from '@nestjs/common';

const MikroOrmConfig = {
  type: 'postgresql',
  host: process.env['DB_HOST'],
  password: process.env['DB_PASSWORD'],
  user: process.env['DB_USER'],
  dbName: process.env['DB_NAME'],
  entities: ['./**/*.entity.js'],
  entitiesTs: ['./**/*.entity.js'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
  seeder: {
    path: 'dist/seeds',
    pathTs: 'src/seeds',
  },
  debug: true,
  findOneOrFailHandler: (entityName: string) =>
    new NotFoundException(`${entityName} was not found`),
} as Options;

export const mikroOrmProvider = MikroOrmConfig as MikroOrmModuleSyncOptions;

export default MikroOrmConfig;
