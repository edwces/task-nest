import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../modules/user/user.entity';
import * as argon2 from 'argon2';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const hashed = await argon2.hash('12345');
    em.create(User, { name: 'Bob', email: 'b@gmail.com', hash: hashed });
  }
}
