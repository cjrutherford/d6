import { Test, TestingModule } from '@nestjs/testing';
import { AiAssistanceController } from './ai-assistance.controller';

describe('AiAssistanceController', () => {
  let controller: AiAssistanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiAssistanceController],
    }).compile();

    controller = module.get<AiAssistanceController>(AiAssistanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
