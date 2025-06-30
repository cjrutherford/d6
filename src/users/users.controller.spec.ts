import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TokenEntity } from '../database/entities';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockTokenRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  }

  const mockUsersService = {
    getUserProfile: jest.fn(),
    createUserProfile: jest.fn(),
    updateUserProfile: jest.fn(),
    deleteUserProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: getRepositoryToken(TokenEntity),
        useValue: mockTokenRepo,
      },{
        provide: UsersService,
        useValue: mockUsersService,
      }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUserProfile', () => {
    it('should throw error if user is not authenticated', async () => {
      await expect(controller.getUserProfile(undefined as any)).rejects.toThrow('User not authenticated');
      await expect(controller.getUserProfile({} as any)).rejects.toThrow('User not authenticated');
    });

    it('should call usersService.getUserProfile with user id', async () => {
      const user = { id: 1 } as any;
      const expectedProfile = { id: 1, name: 'Test' };
      mockUsersService.getUserProfile = jest.fn().mockResolvedValue(expectedProfile);

      const result = await controller.getUserProfile(user);

      expect(mockUsersService.getUserProfile).toHaveBeenCalledWith(1);
      expect(result).toBe(expectedProfile);
    });
  });

  describe('createUserProfile', () => {
    it('should throw error if user is not authenticated', async () => {
      await expect(controller.createUserProfile(undefined as any, {} as any)).rejects.toThrow('User not authenticated');
      await expect(controller.createUserProfile({} as any, {} as any)).rejects.toThrow('User not authenticated');
    });

    it('should call usersService.createUserProfile with user id and profileData', async () => {
      const user = { id: 2 } as any;
      const profileData = { name: 'Test' };
      const expectedProfile = { id: 2, name: 'Test' };
      mockUsersService.createUserProfile = jest.fn().mockResolvedValue(expectedProfile);

      const result = await controller.createUserProfile(user, profileData as any);

      expect(mockUsersService.createUserProfile).toHaveBeenCalledWith(2, profileData);
      expect(result).toBe(expectedProfile);
    });
  });

  describe('updateUserProfile', () => {
    it('should throw error if user is not authenticated', async () => {
      await expect(controller.updateUserProfile(undefined as any, {} as any)).rejects.toThrow('User not authenticated');
      await expect(controller.updateUserProfile({} as any, {} as any)).rejects.toThrow('User not authenticated');
    });

    it('should call usersService.updateUserProfile with user id and profileData', async () => {
      const user = { id: 3 } as any;
      const profileData = { name: 'Updated' };
      const expectedProfile = { id: 3, name: 'Updated' };
      mockUsersService.updateUserProfile = jest.fn().mockResolvedValue(expectedProfile);

      const result = await controller.updateUserProfile(user, profileData as any);

      expect(mockUsersService.updateUserProfile).toHaveBeenCalledWith(3, profileData);
      expect(result).toBe(expectedProfile);
    });
  });

  describe('deleteUserProfile', () => {
    it('should throw error if user is not authenticated', async () => {
      await expect(controller.deleteUserProfile(undefined as any)).rejects.toThrow('User not authenticated');
      await expect(controller.deleteUserProfile({} as any)).rejects.toThrow('User not authenticated');
    });

    it('should call usersService.deleteUserProfile with user id', async () => {
      const user = { id: 4 } as any;
      const expectedResult = { success: true };
      mockUsersService.deleteUserProfile = jest.fn().mockResolvedValue(expectedResult);

      const result = await controller.deleteUserProfile(user);

      expect(mockUsersService.deleteUserProfile).toHaveBeenCalledWith(4);
      expect(result).toBe(expectedResult);
    });
  });
});
