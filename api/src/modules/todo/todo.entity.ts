import {
  Collection,
  Entity,
  ManyToOne,
  ManyToMany,
  PrimaryKey,
  Property,
  DateType,
  Enum,
} from '@mikro-orm/core';
import { BasicEntity } from '../../common/entities/basic.entity';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import { Repeat } from './enums/repeat.enum';

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

  @Property()
  isBookmarked: boolean = false;

  @Property()
  isChecked: boolean = false;

  @Property({ type: DateType, nullable: true })
  checkedAt?: Date;

  @Enum(() => Repeat)
  repeat: Repeat = Repeat.NONE;

  @Property({ persist: false })
  get isExpired() {
    const now = new Date();
    now.setDate(now.getDate() - 1);
    return !!this.expiresAt && this.expiresAt.getTime() < now.getTime();
  }

  @ManyToMany(() => Tag, (tag) => tag.todos, { owner: true })
  tags = new Collection<Tag>(this);
}
