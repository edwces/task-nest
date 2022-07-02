import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Todo {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;
}