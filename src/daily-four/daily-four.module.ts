import { Module } from '@nestjs/common';
import { DailyFourController } from './daily-four.controller';
import { DailyFourService } from './daily-four.service';

@Module({
  controllers: [DailyFourController],
  providers: [DailyFourService]
})
export class DailyFourModule {}
