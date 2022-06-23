import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { BasicEntity } from 'src/shared/entities/basic.entity';
import { UserRole } from 'src/shared/types/enums/user-role.enum';

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
  password!: string;

  @Property({ hidden: true })
  token!: string;

  @Enum(() => UserRole)
  role = UserRole.USER;
}
