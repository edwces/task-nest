import {
  Collection,
  Entity,
  ManyToOne,
  ManyToMany,
  PrimaryKey,
  Property,
  DateType,
} from '@mikro-orm/core';
import { BasicEntity } from '../../common/entities/basic.entity';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';

@Entity()
export class Todo extends BasicEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  label!: string;

  @Property({ columnType: 'Text' })
  description = '';

  @ManyToOne(() => User)
  author!: User;

  @Property({ type: DateType, nullable: true })
  expiresAt?: Date;

  @Property({ persist: false })
  get isExpired() {
    const now = new Date();
    now.setDate(now.getDate() - 1);
    return !!this.expiresAt && this.expiresAt.getTime() < now.getTime();
  }

  @ManyToMany(() => Tag, (tag) => tag.todos)
  tags = new Collection<Tag>(this);
}
