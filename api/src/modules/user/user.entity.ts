import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BasicEntity } from '../../common/entities/basic.entity';
import { UserRole } from '../user/enums/user-role.enum';
import { Todo } from '../todo/todo.entity';

@Entity()
export class User extends BasicEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  @Unique()
  email!: string;

  @Property({ hidden: true })
  hash!: string;

  @Enum({ items: () => UserRole, array: true })
  roles: UserRole[] = [UserRole.USER];

  @OneToMany(() => Todo, (todo) => todo.author)
  todos = new Collection<Todo>(this);
}
