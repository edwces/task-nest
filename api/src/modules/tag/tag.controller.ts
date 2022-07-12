import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JWTAccessGuard } from '../auth/guards/jwt-access.guard';
import { UserRole } from '../user/enums/user-role.enum';
import { CreateTagDTO } from './dto/create-tag.dto';
import { TagService } from './tag.service';

@Controller('tags')
@Roles(UserRole.ADMIN)
@UseGuards(JWTAccessGuard, RolesGuard)
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
