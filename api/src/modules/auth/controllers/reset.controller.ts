import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResetCodeFieldsDTO } from '../dto/reset-code-fields.dto';
import { ResetPasswordFieldsDTO } from '../dto/reset-password-fields.dto';
import { ResetService } from '../services/reset.service';

@Controller('auth/reset')
export class ResetController {
  constructor(private readonly resetService: ResetService) {}

  @Post('code')
  @HttpCode(HttpStatus.OK)
  createResetCode(@Body() dto: ResetCodeFieldsDTO) {
    return this.resetService.createResetCode(dto);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() dto: ResetPasswordFieldsDTO) {
    return this.resetService.resetPassword(dto);
  }
}
