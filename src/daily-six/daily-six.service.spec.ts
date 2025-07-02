import { Test, TestingModule } from '@nestjs/testing';
import { DailySixService } from './daily-six.service';

describe('DailySixService', () => {
  let service: DailySixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailySixService],
    }).compile();

    service = module.get<DailySixService>(DailySixService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
