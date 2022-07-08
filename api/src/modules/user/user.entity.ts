import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { BasicEntity } from 'src/common/entities/basic.entity';
import { UserRole } from 'src/modules/user/enums/user-role.enum';

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
}
