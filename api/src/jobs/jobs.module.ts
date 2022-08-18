import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Todo } from '../modules/todo/todo.entity';
import { TodoScheduler } from './todo.scheduler';

@Module({
  imports: [MikroOrmModule.forFeature([Todo])],
  providers: [TodoScheduler],
})
export class JobsModule {}
