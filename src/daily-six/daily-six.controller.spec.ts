import { Test, TestingModule } from '@nestjs/testing';
import { DailySixController } from './daily-six.controller';

describe('DailySixController', () => {
  let controller: DailySixController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailySixController],
    }).compile();

    controller = module.get<DailySixController>(DailySixController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
