import {
  Collection,
  Entity,
  ManyToOne,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BasicEntity } from 'src/common/entities/basic.entity';
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

  @Property({ nullable: true })
  expiresAt?: Date;

  @Property({ persist: false })
  get isExpired() {
    return (
      this.expiresAt.toISOString().split('T')[0] ===
      new Date().toISOString().split('T')[0]
    );
  }

  @ManyToMany(() => Tag, (tag) => tag.todos)
  tags = new Collection<Tag>(this);
}
