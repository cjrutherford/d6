import { Module } from '@nestjs/common';
import { DailySixController } from './daily-six.controller';
import { DailySixService } from './daily-six.service';

@Module({
  controllers: [DailySixController],
  providers: [DailySixService]
})
export class DailySixModule {}
