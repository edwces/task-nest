import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../modules/user/user.entity';
import * as argon2 from 'argon2';
import { TodoFactory } from './factories/todo.factory';
import { TagFactory } from './factories/tag.factory';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const todoFactory = new TodoFactory(em);
    const tagFactory = new TagFactory(em);

    const choose = <T>(choices: T[]): T => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      return choices[randomIndex];
    };

    const hashed = await argon2.hash('12345');
    const user = em.create(User, {
      name: 'Bob',
      email: 'b@gmail.com',
      hash: hashed,
    });

    const tags = tagFactory
      .each((tag) => {
        tag.author = user;
      })
      .make(10);

    todoFactory
      .each((todo) => {
        todo.author = user;
        const tagAmount = Math.floor(Math.random() * 3);
        const chosen = Array(tagAmount)
          .fill(0)
          .map(() => choose(tags));
        todo.tags.add(...chosen);
      })
      .make(20);
  }
}
