import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MailerModule } from '@nestjs-modules/mailer';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { EnvironmentVariables } from './common/interfaces/environment-variables.interface';
import { CoreModule } from './modules/core.module';
import { mikroOrmProvider } from './config/mikro-orm.provider';
import { mailerProvider } from './config/mailer.provider';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync(mikroOrmProvider),
    RedisModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => ({ config: { host: configService.get('REDIS_HOST') } }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync(mailerProvider),
    ScheduleModule.forRoot(),
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
