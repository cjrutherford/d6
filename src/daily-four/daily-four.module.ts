import { Module } from '@nestjs/common';
import { DailyFourController } from './daily-four.controller';
import { DailyFourService } from './daily-four.service';
import { InternalConfigModule } from '../internal-config/internal-config.module';

@Module({
  imports: [InternalConfigModule],
  controllers: [DailyFourController],
  providers: [DailyFourService]
})
export class DailyFourModule {}
