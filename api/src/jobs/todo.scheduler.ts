import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Repeat } from 'src/modules/todo/enums/repeat.enum';
import { Todo } from 'src/modules/todo/todo.entity';

@Injectable()
export class TodoScheduler {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: EntityRepository<Todo>,
  ) {}

  @Cron('0 0 * * * *')
  async handleRepeatingTodos() {
    const qb = this.todoRepository.createQueryBuilder();

    await qb
      .update({ isChecked: false })
      .where({ repeat: { $ne: Repeat.NONE } });
  }

  @Cron('0 0 * * * *')
  async handleTickingTodos() {
    const qb = this.todoRepository.createQueryBuilder();

    await qb.delete().where({ isChecked: true, repeat: Repeat.NONE });
  }
}
