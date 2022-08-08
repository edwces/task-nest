import { Connection, IDatabaseDriver } from '@mikro-orm/core';
import { MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/common/interfaces/environment-variables.interface';

export const mikroOrmProvider = {
  useFactory: async (configService: ConfigService<EnvironmentVariables>) => {
    return {
      type: 'postgresql',
      host: configService.get('DB_HOST'),
      password: configService.get('DB_PASSWORD'),
      user: configService.get('DB_USER'),
      dbName: configService.get('DB_NAME'),
      entities: ['dist/**/*.entity.js'],
      findOneOrFailHandler: (entityName: string) =>
        new NotFoundException(`${entityName} was not found`),
    };
  },
  inject: [ConfigService],
} as MikroOrmModuleAsyncOptions<IDatabaseDriver<Connection>>;
