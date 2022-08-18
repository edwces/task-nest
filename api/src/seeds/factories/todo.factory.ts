import { EntityData } from '@mikro-orm/core';
import { Factory, Faker } from '@mikro-orm/seeder';
import { Repeat } from '../../modules/todo/enums/repeat.enum';
import { Todo } from '../../modules/todo/todo.entity';

export class TodoFactory extends Factory<Todo> {
  model = Todo;

  protected definition(faker: Faker): EntityData<Todo> {
    const choose = <T>(choices: T[]): T => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      return choices[randomIndex];
    };

    const randTrue = (percent: number) =>
      Math.random() * 100 > percent ? false : true;

    const expiration = new Date();
    expiration.setDate(
      faker.datatype.number({ min: 0, max: 11 }) + expiration.getDate(),
    );
    const repeat = randTrue(35)
      ? (choose(Object.keys(Repeat)) as Repeat)
      : Repeat.NONE;

    const isChecked = randTrue(25);
    let checkedAt = null;
    if (isChecked) {
      checkedAt = new Date();
    }

    return {
      label: faker.random.words(6),
      description: faker.lorem.text(),
      expiresAt: Math.random() > 0.5 ? null : expiration,
      repeat: repeat,
      isBookmarked: randTrue(50),
      isChecked: isChecked,
      checkedAt: checkedAt,
    };
  }
}
