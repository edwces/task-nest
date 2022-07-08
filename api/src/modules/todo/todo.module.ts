import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from '../user/user.module';
import { TodoController } from './todo.controller';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Module({
  imports: [MikroOrmModule.forFeature([Todo]), CommonModule, UserModule],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
