import {
  Collection,
  Entity,
  ManyToOne,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BasicEntity } from 'src/common/entities/basic.entity';
import { Todo } from '../todo/todo.entity';
import { User } from '../user/user.entity';

@Entity()
@Unique({ properties: ['author', 'label'] })
export class Tag extends BasicEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  label!: string;

  @ManyToOne(() => User)
  author!: User;

  @ManyToMany(() => Todo, (todo) => todo.tags, { owner: true })
  todos = new Collection<Todo>(this);
}
