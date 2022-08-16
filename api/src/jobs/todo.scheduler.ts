import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, Logger, Scope } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Repeat } from 'src/modules/todo/enums/repeat.enum';
import { Todo } from 'src/modules/todo/todo.entity';

@Injectable({ scope: Scope.REQUEST })
export class TodoScheduler {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: EntityRepository<Todo>,
  ) {}

  @Cron('0 0 * * * *')
  async handleDailyRepeatingTodos() {
    const qb = this.todoRepository.createQueryBuilder();
    await qb.update({ isChecked: false }).where({ repeat: Repeat.DAILY });
  }

  @Cron(`0 0 * * 0 *`)
  async handleWeeklyRepeatingTodos() {
    const qb = this.todoRepository.createQueryBuilder();
    await qb.update({ isChecked: false }).where({ repeat: Repeat.WEEKLY });
  }

  @Cron(`0 0 1 * * *`)
  async handleMonthlyRepeatingTodos() {
    const qb = this.todoRepository.createQueryBuilder();
    await qb.update({ isChecked: false }).where({ repeat: Repeat.MONTHLY });
  }

  @Cron('0 0 * * * *')
  async handleTickingTodos() {
    const qb = this.todoRepository.createQueryBuilder();
    await qb.delete('*').where({ isChecked: true, repeat: Repeat.NONE });
  }
}
