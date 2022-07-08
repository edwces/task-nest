import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { TodoModule } from '../todo/todo.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    TodoModule,
    forwardRef(() => CommonModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
