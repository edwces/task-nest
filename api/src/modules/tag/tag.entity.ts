import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BasicEntity } from 'src/common/entities/basic.entity';
import { Todo } from '../todo/todo.entity';
import { User } from '../user/user.entity';

@Entity()
export class Tag extends BasicEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  @Unique()
  label!: string;

  @ManyToOne(() => User)
  author!: User;

  @OneToMany(() => Todo, (todo) => todo.tag)
  todos = new Collection<Todo>(this);
}
