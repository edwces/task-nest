import { Body, Controller, Get, Post } from '@nestjs/common';
import { Private } from '../../common/decorators/private.decorator';
import { CreateTagDTO } from './dto/create-tag.dto';
import { TagService } from './tag.service';

@Private()
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Post()
  create(@Body() dto: CreateTagDTO) {
    return this.tagService.create(dto);
  }
}
