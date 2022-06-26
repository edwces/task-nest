import { Property } from '@mikro-orm/core';

export abstract class BasicEntity {
  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
