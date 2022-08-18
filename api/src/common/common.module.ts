import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../modules/user/user.module';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [RolesGuard],
  exports: [RolesGuard],
})
export class CommonModule {}
