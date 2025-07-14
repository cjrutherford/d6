import { Test, TestingModule } from '@nestjs/testing';
import { DailyFourController } from './daily-four.controller';
import { DailyFourService } from './daily-four.service';
import { UserType } from '../authentication/user.decorator';
import { AuthGuard } from '../authentication/auth/auth.guard';

describe('DailyFourController', () => {
  let controller: DailyFourController;
  let service: DailyFourService;

  const mockDailyFourService = {
    createDailyFour: jest.fn(),
    getDailyFourByUserId: jest.fn(),
    updateDailyFour: jest.fn(),
    queryDailyFour: jest.fn(),
    deleteDailyFour: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyFourController],
      providers: [
        {
          provide: DailyFourService,
          useValue: mockDailyFourService,
        },
      ],
    })
    .overrideGuard(AuthGuard)
    .useValue({ canActivate: () => true })
    .compile();

    controller = module.get<DailyFourController>(DailyFourController);
    service = module.get<DailyFourService>(DailyFourService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createDailyFour', () => {
    it('should create a daily four entry', async () => {
      const createDailyFourDto = { affirmation: 'test', plannedPleasurable: 'test', mindfulActivity: 'test', gratitude: 'test', public: true };
      const user: UserType = { userId: 'user123', email: 'test@example.com', iat: 123, exp: 456 };
      const expectedResult = { ...createDailyFourDto, userId: user.userId, id: 'someId' };

      mockDailyFourService.createDailyFour.mockResolvedValue(expectedResult);

      const result = await controller.createDailyFour(user, createDailyFourDto);

      expect(mockDailyFourService.createDailyFour).toHaveBeenCalledWith(user.userId, createDailyFourDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getDailyFourByUserId', () => {
    it('should return daily four entries by user ID', async () => {
      const user: UserType = { userId: 'user123', email: 'test@example.com', iat: 123, exp: 456 };
      const expectedResult = [{ id: 'someId', affirmation: 'test' }];

      mockDailyFourService.getDailyFourByUserId.mockResolvedValue(expectedResult);

      const result = await controller.getDailyFourByUserId(user);

      expect(mockDailyFourService.getDailyFourByUserId).toHaveBeenCalledWith(user.userId);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateDailyFour', () => {
    it('should update a daily four entry', async () => {
      const updateDailyFourDto = { affirmation: 'updated' };
      const user: UserType = { userId: 'user123', email: 'test@example.com', iat: 123, exp: 456 };
      const expectedResult = { id: 'someId', affirmation: 'updated', userId: user.userId };

      mockDailyFourService.updateDailyFour.mockResolvedValue(expectedResult);

      const result = await controller.updateDailyFour(user, updateDailyFourDto);

      expect(mockDailyFourService.updateDailyFour).toHaveBeenCalledWith(user.userId, updateDailyFourDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('queryDailyFour', () => {
    it('should return daily four entries based on query', async () => {
      const queryDto = { public: true };
      const expectedResult = [{ id: 'someId', public: true }];

      mockDailyFourService.queryDailyFour.mockResolvedValue(expectedResult);

      const result = await controller.queryDailyFour(queryDto);

      expect(mockDailyFourService.queryDailyFour).toHaveBeenCalledWith(queryDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('deleteDailyFour', () => {
    it('should delete a daily four entry', async () => {
      const user: UserType = { userId: 'user123', email: 'test@example.com', iat: 123, exp: 456 };
      const id = 'someId';

      mockDailyFourService.deleteDailyFour.mockResolvedValue(undefined);

      await controller.deleteDailyFour(user, id);

      expect(mockDailyFourService.deleteDailyFour).toHaveBeenCalledWith(id);
    });
  });
});
