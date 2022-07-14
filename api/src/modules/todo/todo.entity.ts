import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { BasicEntity } from 'src/common/entities/basic.entity';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';

@Entity()
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
