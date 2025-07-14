import { Test, TestingModule } from '@nestjs/testing';
import { DailySixService } from './daily-six.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DailySixEntity, UserEntity } from '../database/entities';

describe('DailySixService', () => {
  let service: DailySixService;
  let dailySixRepository: any;
  let userRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DailySixService,
        {
          provide: getRepositoryToken(DailySixEntity),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            createQueryBuilder: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
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

    service = module.get<DailySixService>(DailySixService);
    dailySixRepository = module.get(getRepositoryToken(DailySixEntity));
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createDailySix', () => {
    it('should create a new daily six entry', async () => {
      const createDto = { affirmation: 'test', judgement: 'test', nonJudgement: 'test', plannedPleasurable: 'test', mindfulActivity: 'test', gratitude: 'test', public: true };
      const user = { id: 'user123' };
      const createdDailySix = { ...createDto, user }; // What `create` returns
      const savedDailySix = { ...createdDailySix, id: 'someId', userId: user.id }; // What `save` resolves to

      userRepository.findOne.mockResolvedValue(user);
      dailySixRepository.create.mockReturnValue(createdDailySix);
      dailySixRepository.save.mockResolvedValue(savedDailySix);

      const result = await service.createDailySix(user.id, createDto);

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: user.id } });
      expect(dailySixRepository.create).toHaveBeenCalledWith({ ...createDto, user });
      expect(dailySixRepository.save).toHaveBeenCalledWith(createdDailySix); // Expect `save` to be called with `createdDailySix`
      expect(result).toEqual(savedDailySix); // Expect the service to return `savedDailySix`
    });

    it('should throw an error if user is not found', async () => {
      const createDto = { affirmation: 'test', judgement: 'test', nonJudgement: 'test', plannedPleasurable: 'test', mindfulActivity: 'test', gratitude: 'test', public: true };
      const userId = 'nonExistentUser';

      userRepository.findOne.mockResolvedValue(undefined);

      await expect(service.createDailySix(userId, createDto)).rejects.toThrow('User not found');
    });
  });

  describe('updateDailySix', () => {
    it('should update an existing daily six entry', async () => {
      const updateDto = { affirmation: 'updated' };
      const existingEntry = { id: 'someId', affirmation: 'old', userId: 'user123' };
      const expectedResult = { ...existingEntry, ...updateDto };

      dailySixRepository.findOne.mockResolvedValue(existingEntry);
      dailySixRepository.save.mockResolvedValue(expectedResult);

      const result = await service.updateDailySix('someId', updateDto);

      expect(dailySixRepository.findOne).toHaveBeenCalledWith({ where: { id: 'someId' } });
      expect(dailySixRepository.save).toHaveBeenCalledWith(expect.objectContaining(updateDto));
      expect(result).toEqual(expectedResult);
    });

    it('should throw if daily six entry not found on update', async () => {
      dailySixRepository.findOne.mockResolvedValue(undefined);

      await expect(service.updateDailySix('someId', { affirmation: 'updated' })).rejects.toThrow('Daily Six entry not found');
    });
  });

  describe('getDailySixByUserId', () => {
    it('should return a daily six entry by user id', async () => {
      const expectedResult = [{ id: 'someId', affirmation: 'test' }];
      dailySixRepository.find.mockResolvedValue(expectedResult);

      const result = await service.getDailySixByUserId('someId');

      expect(dailySixRepository.find).toHaveBeenCalledWith({ where: { user: { id: 'someId' } }, order: { createdAt: 'DESC' } });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('queryDailySix', () => {
    it('should return public daily six entries', async () => {
      const mockDailySixEntities = [{ id: 'someId', public: true, user: { id: 'user123' }, affirmation: 'test', judgement: 'test', nonJudgement: 'test', mindfulActivity: 'test', gratitude: 'test', createdAt: new Date() }];
      const expectedDailySixDtos = [{ id: 'someId', public: true, userId: 'user123', affirmation: 'test', judgement: 'test', nonJudgement: 'test', mindfulActivity: 'test', gratitude: 'test', createdAt: mockDailySixEntities[0].createdAt }];

      dailySixRepository.createQueryBuilder.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockDailySixEntities),
      });

      const result = await service.queryDailySix({ public: true });

      expect(dailySixRepository.createQueryBuilder).toHaveBeenCalledWith('dailySix');
      expect(result).toEqual(expectedDailySixDtos);
    });
  });

  describe('deleteDailySix', () => {
    it('should delete a daily six entry', async () => {
      const existingEntry = { id: 'someId', affirmation: 'old', userId: 'user123' };
      dailySixRepository.findOne.mockResolvedValue(existingEntry);
      dailySixRepository.remove.mockResolvedValue(undefined);

      await service.deleteDailySix('someId');

      expect(dailySixRepository.findOne).toHaveBeenCalledWith({ where: { id: 'someId' } });
      expect(dailySixRepository.remove).toHaveBeenCalledWith(existingEntry);
    });

    it('should throw if daily six entry not found on delete', async () => {
      dailySixRepository.findOne.mockResolvedValue(undefined);

      await expect(service.deleteDailySix('someId')).rejects.toThrow('Daily Six entry not found');
    });
  });
});