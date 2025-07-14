import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TokenEntity } from '../database/entities';
import { UsersService } from './users.service';
import User from '../authentication/user.decorator';
import { UserType } from '../authentication/user.decorator';

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
    it('should call usersService.getUserProfile with user id', async () => {
      const user: UserType = { userId: '1', email: 'test@example.com', iat: 123, exp: 456 };
      const expectedProfile = { id: 1, name: 'Test' };
      mockUsersService.getUserProfile.mockResolvedValue(expectedProfile);

      const result = await controller.getUserProfile(user);

      expect(mockUsersService.getUserProfile).toHaveBeenCalledWith(user.userId);
      expect(result).toBe(expectedProfile);
    });

    it('should throw an error if user is not authenticated', async () => {
      const user: UserType = { userId: '', email: 'test@example.com', iat: 123, exp: 456 };
      await expect(controller.getUserProfile(user)).rejects.toThrow('User not authenticated');
    });
  });

  describe('getUserProfileById', () => {
    it('should call usersService.getUserProfile with provided user id', async () => {
      const user: UserType = { userId: '1', email: 'test@example.com', iat: 123, exp: 456 };
      const userIdParam = '5';
      const expectedProfile = { id: 5, name: 'Test' };
      mockUsersService.getUserProfile.mockResolvedValue(expectedProfile);

      const result = await controller.getUserProfileById(user, userIdParam);

      expect(mockUsersService.getUserProfile).toHaveBeenCalledWith(userIdParam);
      expect(result).toBe(expectedProfile);
    });

    it('should throw an error if user is not authenticated', async () => {
      const user: UserType = { userId: '', email: 'test@example.com', iat: 123, exp: 456 };
      await expect(controller.getUserProfileById(user, 'someId')).rejects.toThrow('User not authenticated');
    });
  });

  describe('createUserProfile', () => {
    it('should call usersService.createUserProfile with user id and profileData', async () => {
      const user: UserType = { userId: '2', email: 'test@example.com', iat: 123, exp: 456 };
      const profileData = { name: 'Test' };
      const expectedProfile = { id: 2, name: 'Test' };
      mockUsersService.createUserProfile.mockResolvedValue(expectedProfile);

      const result = await controller.createUserProfile(user, profileData as any);

      expect(mockUsersService.createUserProfile).toHaveBeenCalledWith(user.userId, profileData);
      expect(result).toBe(expectedProfile);
    });

    it('should throw an error if user is not authenticated', async () => {
      const user: UserType = { userId: '', email: 'test@example.com', iat: 123, exp: 456 };
      await expect(controller.createUserProfile(user, {} as any)).rejects.toThrow('User not authenticated');
    });
  });

  describe('updateUserProfile', () => {
    it('should call usersService.updateUserProfile with user id and profileData', async () => {
      const user: UserType = { userId: '3', email: 'test@example.com', iat: 123, exp: 456 };
      const profileData = { name: 'Updated' };
      const expectedProfile = { id: 3, name: 'Updated' };
      mockUsersService.updateUserProfile.mockResolvedValue(expectedProfile);

      const result = await controller.updateUserProfile(user, profileData as any);

      expect(mockUsersService.updateUserProfile).toHaveBeenCalledWith(user.userId, profileData);
      expect(result).toBe(expectedProfile);
    });

    it('should throw an error if user is not authenticated', async () => {
      const user: UserType = { userId: '', email: 'test@example.com', iat: 123, exp: 456 };
      await expect(controller.updateUserProfile(user, {} as any)).rejects.toThrow('User not authenticated');
    });
  });

  describe('deleteUserProfile', () => {
    it('should call usersService.deleteUserProfile with user id', async () => {
      const user: UserType = { userId: '4', email: 'test@example.com', iat: 123, exp: 456 };
      const expectedResult = { success: true };
      mockUsersService.deleteUserProfile.mockResolvedValue(expectedResult);

      const result = await controller.deleteUserProfile(user);

      expect(mockUsersService.deleteUserProfile).toHaveBeenCalledWith(user.userId);
      expect(result).toBe(expectedResult);
    });

    it('should throw an error if user is not authenticated', async () => {
      const user: UserType = { userId: '', email: 'test@example.com', iat: 123, exp: 456 };
      await expect(controller.deleteUserProfile(user)).rejects.toThrow('User not authenticated');
    });
  });
});