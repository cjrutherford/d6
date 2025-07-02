import { Test, TestingModule } from '@nestjs/testing';
import { AiAssistanceService } from './ai-assistance.service';

describe('AiAssistanceService', () => {
  let service: AiAssistanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiAssistanceService],
    }).compile();

    service = module.get<AiAssistanceService>(AiAssistanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
