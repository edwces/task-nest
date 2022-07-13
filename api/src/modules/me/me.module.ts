import { Module } from '@nestjs/common';
import { TagModule } from '../tag/tag.module';
import { TodoModule } from '../todo/todo.module';
import { UserModule } from '../user/user.module';
import { MeController } from './me.controller';

@Module({
  imports: [TodoModule, UserModule, TagModule],
  controllers: [MeController],
})
export class MeModule {}
