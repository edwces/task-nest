import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BasicEntity } from 'src/common/entities/basic.entity';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';

@Entity()
@Unique({ properties: ['author', 'tag'] })
export class Todo extends BasicEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  label!: string;

  @ManyToOne(() => User)
  author!: User;

  @ManyToOne(() => Tag, { nullable: true })
  tag?: Tag;
}
