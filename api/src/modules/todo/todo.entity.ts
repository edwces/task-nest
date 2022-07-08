import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { BasicEntity } from 'src/common/entities/basic.entity';

@Entity()
export class Todo extends BasicEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  label!: string;
}
