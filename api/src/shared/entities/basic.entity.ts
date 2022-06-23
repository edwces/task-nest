import { Property } from '@mikro-orm/core';

export abstract class BasicEntity {
  @Property({ onCreate: () => Date.now() })
  createdAt: Date;

  @Property({ onUpdate: () => Date.now() })
  updatedAt: Date;
}
