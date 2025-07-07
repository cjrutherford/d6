import { Test, TestingModule } from '@nestjs/testing';
import { PromptEngineeringService } from './prompt-engineering.service';

describe('PromptEngineeringService', () => {
  let service: PromptEngineeringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromptEngineeringService],
    }).compile();

    service = module.get<PromptEngineeringService>(PromptEngineeringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
