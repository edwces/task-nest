import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MeModule } from './me/me.module';
import { TagModule } from './tag/tag.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, TodoModule, TagModule, AuthModule, MeModule],
  exports: [UserModule, TodoModule, TagModule, AuthModule, MeModule],
})
export class CoreModule {}
