import { EntityData } from '@mikro-orm/core';
import { Factory, Faker } from '@mikro-orm/seeder';
import { Tag } from '../../modules/tag/tag.entity';

export class TagFactory extends Factory<Tag> {
  model = Tag;

  protected definition(faker: Faker): EntityData<Tag> {
    return {
      label: faker.random.word(),
    };
  }
}
