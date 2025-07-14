import { Module } from '@nestjs/common';
import { DailySixController } from './daily-six.controller';
import { DailySixService } from './daily-six.service';
import { InternalConfigModule } from '../internal-config/internal-config.module';

@Module({
  imports: [InternalConfigModule],
  controllers: [DailySixController],
  providers: [DailySixService]
})
export class DailySixModule {}
