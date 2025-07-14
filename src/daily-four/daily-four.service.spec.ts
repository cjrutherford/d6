import { Test, TestingModule } from '@nestjs/testing';
import { DailyFourService } from './daily-four.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DailyFourEntity, UserEntity } from '../database/entities';

describe('DailyFourService', () => {
  let service: DailyFourService;
  let dailyFourRepository: any;
  let userRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DailyFourService,
        {
          provide: getRepositoryToken(DailyFourEntity),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            createQueryBuilder: jest.fn(),
            remove: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DailyFourService>(DailyFourService);
    dailyFourRepository = module.get(getRepositoryToken(DailyFourEntity));
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createDailyFour', () => {
    it('should create a new daily four entry', async () => {
      const createDto = { affirmation: 'test', plannedPleasurable: 'test', mindfulActivity: 'test', gratitude: 'test', public: true };
      const user = { id: 'user123' };
      const createdDailyFour = { ...createDto, user }; // What `create` returns
      const savedDailyFour = { ...createdDailyFour, id: 'someId', userId: user.id }; // What `save` resolves to

      userRepository.findOne.mockResolvedValue(user);
      dailyFourRepository.create.mockReturnValue(createdDailyFour);
      dailyFourRepository.save.mockResolvedValue(savedDailyFour);

      const result = await service.createDailyFour(user.id, createDto);

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: user.id } });
      expect(dailyFourRepository.create).toHaveBeenCalledWith({ ...createDto, user });
      expect(dailyFourRepository.save).toHaveBeenCalledWith(createdDailyFour); // Expect `save` to be called with `createdDailyFour`
      expect(result).toEqual(savedDailyFour); // Expect the service to return `savedDailyFour`
    });
  });

  describe('updateDailyFour', () => {
    it('should update an existing daily four entry', async () => {
      const updateDto = { affirmation: 'updated' };
      const existingEntry = { id: 'someId', affirmation: 'old', userId: 'user123' };
      const expectedResult = { ...existingEntry, ...updateDto };

      dailyFourRepository.findOne.mockResolvedValue(existingEntry);
      dailyFourRepository.save.mockResolvedValue(expectedResult);

      const result = await service.updateDailyFour('someId', updateDto);

      expect(dailyFourRepository.findOne).toHaveBeenCalledWith({ where: { id: 'someId' } });
      expect(dailyFourRepository.save).toHaveBeenCalledWith(expect.objectContaining(updateDto));
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getDailyFourByUserId', () => {
    it('should return a daily four entry by user id', async () => {
      const expectedResult = [{ id: 'someId', affirmation: 'test' }];
      dailyFourRepository.find.mockResolvedValue(expectedResult);

      const result = await service.getDailyFourByUserId('someId');

      expect(dailyFourRepository.find).toHaveBeenCalledWith({ where: { user: { id: 'someId' } }, order: { createdAt: 'DESC' } });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('queryDailyFour', () => {
    it('should return public daily four entries', async () => {
      const mockDailyFourEntities = [{ id: 'someId', public: true, user: { id: 'user123' }, affirmation: 'test', mindfulActivity: 'test', gratitude: 'test', plannedPleasurable: 'test', createdAt: new Date() }];
      const expectedDailyFourDtos = [{ id: 'someId', public: true, userId: 'user123', affirmation: 'test', mindfulActivity: 'test', gratitude: 'test', plannedPleasurable: 'test', createdAt: mockDailyFourEntities[0].createdAt }];

      dailyFourRepository.createQueryBuilder.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockDailyFourEntities),
      });

      const result = await service.queryDailyFour({ public: true });

      expect(dailyFourRepository.createQueryBuilder).toHaveBeenCalledWith('dailyFour');
      expect(result).toEqual(expectedDailyFourDtos);
    });
  });

  describe('deleteDailyFour', () => {
    it('should delete a daily four entry', async () => {
      const existingEntry = { id: 'someId', affirmation: 'old', userId: 'user123' };
      dailyFourRepository.findOne.mockResolvedValue(existingEntry);
      dailyFourRepository.remove.mockResolvedValue(undefined);

      await service.deleteDailyFour('someId');

      expect(dailyFourRepository.findOne).toHaveBeenCalledWith({ where: { id: 'someId' } });
      expect(dailyFourRepository.remove).toHaveBeenCalledWith(existingEntry);
    });

    it('should throw if daily four entry not found on delete', async () => {
      dailyFourRepository.findOne.mockResolvedValue(undefined);

      await expect(service.deleteDailyFour('someId')).rejects.toThrow('Daily Four entry not found');
    });
  });
});