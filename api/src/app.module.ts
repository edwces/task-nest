import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MailerModule } from '@nestjs-modules/mailer';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { MeModule } from './modules/me/me.module';
import { TagModule } from './modules/tag/tag.module';
import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';
import * as nodemailer from 'nodemailer';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { EnvironmentVariables } from './common/interfaces/environment-variables.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => {
        console.log(configService.get('DB_PASSWORD'));

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
    }),
    RedisModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => ({ config: { host: configService.get('REDIS_HOST') } }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: async () => {
        const testAccount = await nodemailer.createTestAccount();
        return {
          transport: {
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
              type: 'LOGIN',
              user: testAccount.user,
              pass: testAccount.pass,
            },
          },
          preview: true,
        };
      },
    }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 25 }),
    TodoModule,
    TagModule,
    UserModule,
    AuthModule,
    MeModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }

  async onModuleInit() {
    const generator = this.orm.getSchemaGenerator();
    await generator.refreshDatabase();
    await generator.updateSchema();
  }
}
