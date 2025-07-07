import { AiAssistanceController } from './ai-assistance.controller';
import { AiAssistanceService } from './ai-assistance.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PromptEngineeringService } from './prompt-engineering/prompt-engineering.service';

@Module({
  imports: [HttpModule],
  controllers: [AiAssistanceController],
  providers: [
    AiAssistanceService, 
    PromptEngineeringService,
    {
      provide: 'LlamaOptions',
      useValue: {
        host: process.env.LLAMA_HOST ?? 'localhost',
        port: process.env.LLAMA_PORT ? parseInt(process.env.LLAMA_PORT, 10) : 11434,
      }
    }
  ]
})
export class AiAssistanceModule {}
