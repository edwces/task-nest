import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TodoModule } from './modules/todo/todo.module';
import { User } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot({
      type: 'postgresql',
      host: 'postgres',
      password: 'password',
      user: 'postgres',
      dbName: 'postgres',
      entitiesTs: [User],
      entities: ['dist/**/*.entity.js'],
    }),
    UserModule,
    AuthModule,
    TodoModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit() {
    const generator = this.orm.getSchemaGenerator();
    await generator.refreshDatabase();
    await generator.updateSchema();
  }
}
