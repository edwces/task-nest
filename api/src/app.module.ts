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
import * as nodemailer from 'nodemailer';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { EnvironmentVariables } from './common/interfaces/environment-variables.interface';
import { CoreModule } from './modules/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => {
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
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => {
        if (configService.get('NODE_ENV') === 'development') {
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
        } else {
          return {
            transport: {
              host: configService.get('SMTP_HOST'),
              port: 587,
              secure: false,
              auth: {
                type: 'LOGIN',
                user: configService.get('SMTP_USER'),
                pass: configService.get('SMTP_PASSWORD'),
              },
            },
          };
        }
      },
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 25 }),
    CoreModule,
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
