import { Module } from '@nestjs/common';
import { AiAssistanceController } from './ai-assistance.controller';
import { AiAssistanceService } from './ai-assistance.service';

@Module({
  controllers: [AiAssistanceController],
  providers: [AiAssistanceService]
})
export class AiAssistanceModule {}
