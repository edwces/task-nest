import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repeat } from 'src/modules/todo/enums/repeat.enum';
import { Todo } from 'src/modules/todo/todo.entity';

@Injectable()
export class TodoScheduler {
  private readonly logger = new Logger(TodoScheduler.name);

  constructor(private readonly orm: MikroORM<PostgreSqlDriver>) {}

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  @UseRequestContext()
  async handleDailyRepeatingTodos() {
    this.logger.debug('UPDATING daily todos');
    const qb = this.orm.em.createQueryBuilder(Todo);
    await qb
      .update({
        isChecked: false,
        expiresAt: qb.raw(`"expires_at" + interval '1 day'`),
      })
      .where({ repeat: Repeat.DAILY });
  }

  @Cron(CronExpression.EVERY_WEEK)
  @UseRequestContext()
  async handleWeeklyRepeatingTodos() {
    this.logger.debug('UPDATING weekly todos');
    const qb = this.orm.em.createQueryBuilder(Todo);
    await qb
      .update({
        isChecked: false,
        expiresAt: qb.raw(`"expires_at" + interval '7 days'`),
      })
      .where({ repeat: Repeat.WEEKLY });
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  @UseRequestContext()
  async handleMonthlyRepeatingTodos() {
    this.logger.debug('UPDATING monthly todos');
    const qb = this.orm.em.createQueryBuilder(Todo);
    await qb
      .update({
        isChecked: false,
        expiresAt: qb.raw(`"expires_at" + interval '1 month'`),
      })
      .where({ repeat: Repeat.MONTHLY });
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  @UseRequestContext()
  async handleTickingTodos() {
    this.logger.debug('DELETING non-repeating todos');
    const qb = this.orm.em.createQueryBuilder(Todo);
    await qb.delete('*').where({ isChecked: true, repeat: Repeat.NONE });
  }
}
