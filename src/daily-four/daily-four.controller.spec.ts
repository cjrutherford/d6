import { Test, TestingModule } from '@nestjs/testing';
import { DailyFourController } from './daily-four.controller';

describe('DailyFourController', () => {
  let controller: DailyFourController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyFourController],
    }).compile();

    controller = module.get<DailyFourController>(DailyFourController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
