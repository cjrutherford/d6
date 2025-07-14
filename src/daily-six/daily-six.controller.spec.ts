import { Test, TestingModule } from '@nestjs/testing';
import { DailySixController } from './daily-six.controller';
import { DailySixService } from './daily-six.service';
import { AuthGuard } from '../authentication/auth/auth.guard';
import { UserType } from '../authentication/user.decorator';

describe('DailySixController', () => {
  let controller: DailySixController;
  let service: DailySixService;

  const mockDailySixService = {
    createDailySix: jest.fn(),
    getDailySixByUserId: jest.fn(),
    updateDailySix: jest.fn(),
    queryDailySix: jest.fn(),
    deleteDailySix: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailySixController],
      providers: [
        {
          provide: DailySixService,
          useValue: mockDailySixService,
        },
      ],
    })
    .overrideGuard(AuthGuard)
    .useValue({ canActivate: () => true })
    .compile();

    controller = module.get<DailySixController>(DailySixController);
    service = module.get<DailySixService>(DailySixService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createDailySix', () => {
    it('should create a daily six entry', async () => {
      const createDailySixDto = { affirmation: 'test', judgement: 'test', nonJudgement: 'test', plannedPleasurable: 'test', mindfulActivity: 'test', gratitude: 'test', public: true };
      const user: UserType = { userId: 'user123', email: 'test@example.com', iat: 123, exp: 456 };
      const expectedResult = { ...createDailySixDto, userId: user.userId, id: 'someId' };

      mockDailySixService.createDailySix.mockResolvedValue(expectedResult);

      const result = await controller.createDailySix(user, createDailySixDto);

      expect(mockDailySixService.createDailySix).toHaveBeenCalledWith(user.userId, createDailySixDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getDailySixByUserId', () => {
    it('should return daily six entries by user ID', async () => {
      const user: UserType = { userId: 'user123', email: 'test@example.com', iat: 123, exp: 456 };
      const expectedResult = [{ id: 'someId', affirmation: 'test' }];

      mockDailySixService.getDailySixByUserId.mockResolvedValue(expectedResult);

      const result = await controller.getDailySixByUserId(user);

      expect(mockDailySixService.getDailySixByUserId).toHaveBeenCalledWith(user.userId);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateDailySix', () => {
    it('should update a daily six entry', async () => {
      const updateDailySixDto = { affirmation: 'updated' };
      const user: UserType = { userId: 'user123', email: 'test@example.com', iat: 123, exp: 456 };
      const expectedResult = { id: 'someId', affirmation: 'updated', userId: user.userId };

      mockDailySixService.updateDailySix.mockResolvedValue(expectedResult);

      const result = await controller.updateDailySix(user, updateDailySixDto);

      expect(mockDailySixService.updateDailySix).toHaveBeenCalledWith(user.userId, updateDailySixDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('queryDailySix', () => {
    it('should return daily six entries based on query', async () => {
      const queryDto = { public: true };
      const expectedResult = [{ id: 'someId', public: true }];

      mockDailySixService.queryDailySix.mockResolvedValue(expectedResult);

      const result = await controller.queryDailySix(queryDto);

      expect(mockDailySixService.queryDailySix).toHaveBeenCalledWith(queryDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('deleteDailySix', () => {
    it('should delete a daily six entry', async () => {
      const user: UserType = { userId: 'user123', email: 'test@example.com', iat: 123, exp: 456 };
      const id = 'someId';

      mockDailySixService.deleteDailySix.mockResolvedValue(undefined);

      await controller.deleteDailySix(user, id);

      expect(mockDailySixService.deleteDailySix).toHaveBeenCalledWith(id);
    });
  });
});