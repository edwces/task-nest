import { Migration } from '@mikro-orm/migrations';

export class Migration20220818081221 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "email" varchar(255) not null, "hash" varchar(255) not null, "roles" text[] not null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "todo" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "label" varchar(255) not null, "description" Text not null, "author_id" int not null, "expires_at" date null, "is_bookmarked" boolean not null, "is_checked" boolean not null, "checked_at" date null, "repeat" text check ("repeat" in (\'NONE\', \'DAILY\', \'WEEKLY\', \'MONTHLY\')) not null);');

    this.addSql('create table "tag" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "label" varchar(255) not null, "author_id" int not null);');
    this.addSql('alter table "tag" add constraint "tag_author_id_label_unique" unique ("author_id", "label");');

    this.addSql('create table "todo_tags" ("todo_id" int not null, "tag_id" int not null, constraint "todo_tags_pkey" primary key ("todo_id", "tag_id"));');

    this.addSql('alter table "todo" add constraint "todo_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "tag" add constraint "tag_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "todo_tags" add constraint "todo_tags_todo_id_foreign" foreign key ("todo_id") references "todo" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "todo_tags" add constraint "todo_tags_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;');
  }

}
