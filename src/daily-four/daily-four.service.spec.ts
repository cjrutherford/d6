import { Test, TestingModule } from '@nestjs/testing';
import { DailyFourService } from './daily-four.service';

describe('DailyFourService', () => {
  let service: DailyFourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyFourService],
    }).compile();

    service = module.get<DailyFourService>(DailyFourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
