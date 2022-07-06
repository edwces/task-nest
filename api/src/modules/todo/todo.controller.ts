import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserRole } from 'src/common/types/enums/user-role.enum';
import { TodoService } from './todo.service';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @Auth(UserRole.ADMIN)
  findAll() {
    return this.todoService.findAll();
  }
}
