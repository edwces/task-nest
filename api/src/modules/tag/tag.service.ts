import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateTagDTO } from './dto/create-tag.dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: EntityRepository<Tag>,
  ) {}

  async findAll() {
    return await this.tagRepository.findAll();
  }

  async create({ authorId, ...dto }: CreateTagDTO) {
    const tag = this.tagRepository.create({ author: authorId, ...dto });
    await this.tagRepository.persistAndFlush(tag);
    return tag;
  }

  async findByUserId(id: number) {
    return await this.tagRepository.find({ author: id });
  }
}
