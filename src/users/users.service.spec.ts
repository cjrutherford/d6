import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserProfileEntity } from '../database/entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AssetService } from '../asset/asset.service';

describe('UsersService', () => {
  let service: UsersService;
  let userProfileRepo: any;
  let assetService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserProfileEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: AssetService,
          useValue: {
            readAsset: jest.fn(),
            saveAsset: jest.fn(),
            deleteAsset: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userProfileRepo = module.get(getRepositoryToken(UserProfileEntity));
    assetService = module.get(AssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserProfile', () => {
    it('should return user profile with base64 profile picture', async () => {
      const userId = '123';
      const mockProfile = { userId, profilePictureUrl: 'profile.png' };
      const mockBuffer = Buffer.from('imagebinary');

      userProfileRepo.findOne.mockResolvedValue(mockProfile);
      assetService.readAsset.mockResolvedValue(mockBuffer);

      const result = await service.getUserProfile(userId);

      expect(userProfileRepo.findOne).toHaveBeenCalledWith({ where: { user: { id: userId } } });
      expect(assetService.readAsset).toHaveBeenCalledWith('profile.png');
      expect(result.profilePictureUrl).toBe(`data:image/png;base64,${mockBuffer.toString('base64')}`);
    });

    it('should throw if user profile not found', async () => {
      const userId = 'notfound';
      userProfileRepo.findOne.mockResolvedValue(undefined);

      await expect(service.getUserProfile(userId)).rejects.toThrow(
        `User profile not found for user ID: ${userId}`
      );
    });

    it('should throw if profile picture asset not found', async () => {
      const userId = '123';
      const mockProfile = { userId, profilePictureUrl: 'profile.png' };
      userProfileRepo.findOne.mockResolvedValue(mockProfile);
      assetService.readAsset.mockResolvedValue(undefined);

      await expect(service.getUserProfile(userId)).rejects.toThrow(
        `Profile picture not found for user ID: ${userId}`
      );
    });
  });

  describe('createUserProfile', () => {
    it('should create and return new user profile', async () => {
      const userId = '456';
      const base64Pic = Buffer.from('pic').toString('base64');
      const profileData = { profilePictureUrl: base64Pic, name: 'Test' };
      const mockProfile = { ...profileData, userId, profilePictureUrl: 'profile-456.png' };

      userProfileRepo.findOne.mockResolvedValue(undefined);
      assetService.saveAsset.mockResolvedValue('profile-456.png');
      userProfileRepo.create.mockReturnValue(mockProfile);
      userProfileRepo.save.mockResolvedValue(mockProfile);

      const result = await service.createUserProfile(userId, profileData);

      expect(userProfileRepo.findOne).toHaveBeenCalledWith({ where: { user: { id: userId }} });
      expect(assetService.saveAsset).toHaveBeenCalled();
      expect(userProfileRepo.create).toHaveBeenCalled();
      expect(userProfileRepo.save).toHaveBeenCalledWith(mockProfile);
      expect(result).toEqual(mockProfile);
    });

    it('should throw if user profile already exists', async () => {
      const userId = '789';
      userProfileRepo.findOne.mockResolvedValue({ userId });

      await expect(
        service.createUserProfile(userId, { profilePictureUrl: 'abc' })
      ).rejects.toThrow(`User profile already exists for user ID: ${userId}`);
    });

    it('should throw if profile picture is missing', async () => {
      const userId = '999';
      userProfileRepo.findOne.mockResolvedValue(undefined);

      await expect(
        service.createUserProfile(userId, {})
      ).rejects.toThrow('Profile picture is required');
    });

    it('should create and return new user profile when base64 string starts with data:', async () => {
      const userId = '777';
      const base64PicWithPrefix = `data:image/png;base64,${Buffer.from('pic_with_prefix').toString('base64')}`;
      const profileData = { profilePictureUrl: base64PicWithPrefix, name: 'Test With Prefix' };
      const mockProfile = { ...profileData, userId, profilePictureUrl: 'profile-777.png' };

      userProfileRepo.findOne.mockResolvedValue(undefined);
      assetService.saveAsset.mockResolvedValue('profile-777.png');
      userProfileRepo.create.mockReturnValue(mockProfile);
      userProfileRepo.save.mockResolvedValue(mockProfile);

      const result = await service.createUserProfile(userId, profileData);

      expect(userProfileRepo.findOne).toHaveBeenCalledWith({ where: { user: { id: userId }} });
      expect(assetService.saveAsset).toHaveBeenCalled();
      expect(userProfileRepo.create).toHaveBeenCalled();
      expect(userProfileRepo.save).toHaveBeenCalledWith(mockProfile);
      expect(result).toEqual(mockProfile);
    });
  });

  describe('updateUserProfile', () => {
    it('should update profile and save new picture if provided', async () => {
      const userId = '321';
      const oldProfile = { userId, profilePictureUrl: 'old.png', name: 'Old' };
      const newBase64 = Buffer.from('newpic').toString('base64');
      const profileData = { profilePictureUrl: newBase64, name: 'New' };
      const updatedProfile = { ...oldProfile, ...profileData, profilePictureUrl: 'new.png' };

      userProfileRepo.findOne.mockResolvedValue({ ...oldProfile });
      assetService.deleteAsset.mockResolvedValue(undefined);
      assetService.saveAsset.mockResolvedValue('new.png');
      userProfileRepo.save.mockResolvedValue(updatedProfile);

      const result = await service.updateUserProfile(userId, profileData);

      expect(assetService.deleteAsset).toHaveBeenCalledWith('old.png');
      expect(assetService.saveAsset).toHaveBeenCalled();
      expect(userProfileRepo.save).toHaveBeenCalled();
      expect(result).toEqual(updatedProfile);
    });

    it('should update profile without changing picture if not provided', async () => {
      const userId = '654';
      const oldProfile = { userId, profilePictureUrl: 'old.png', name: 'Old' };
      const profileData = { name: 'Updated' };
      const updatedProfile = { ...oldProfile, ...profileData };

      userProfileRepo.findOne.mockResolvedValue({ ...oldProfile });
      userProfileRepo.save.mockResolvedValue(updatedProfile);

      const result = await service.updateUserProfile(userId, profileData);

      expect(userProfileRepo.save).toHaveBeenCalled();
      expect(result).toEqual(updatedProfile);
    });

    it('should throw if user profile not found', async () => {
      const userId = 'notfound';
      userProfileRepo.findOne.mockResolvedValue(undefined);

      await expect(
        service.updateUserProfile(userId, { name: 'Test' })
      ).rejects.toThrow(`User profile not found for user ID: ${userId}`);
    });

    it('should update profile and save new picture if existingProfile does not have a profilePictureUrl', async () => {
      const userId = '888';
      const oldProfile = { userId, name: 'Old' };
      const newBase64 = Buffer.from('newpic_no_old').toString('base64');
      const profileData = { profilePictureUrl: newBase64, name: 'New' };
      const updatedProfile = { ...oldProfile, ...profileData, profilePictureUrl: 'new.png' };

      userProfileRepo.findOne.mockResolvedValue({ ...oldProfile });
      assetService.saveAsset.mockResolvedValue('new.png');
      userProfileRepo.save.mockResolvedValue(updatedProfile);

      const result = await service.updateUserProfile(userId, profileData);

      expect(assetService.saveAsset).toHaveBeenCalled();
      expect(userProfileRepo.save).toHaveBeenCalled();
      expect(result).toEqual(updatedProfile);
    });
  });

  describe('deleteUserProfile', () => {
    it('should delete user profile and its picture', async () => {
      const userId = '111';
      const profile = { userId, profilePictureUrl: 'pic.png' };

      userProfileRepo.findOne.mockResolvedValue(profile);
      assetService.deleteAsset.mockResolvedValue(undefined);
      userProfileRepo.remove.mockResolvedValue(undefined);

      await service.deleteUserProfile(userId);

      expect(userProfileRepo.findOne).toHaveBeenCalledWith({ where: { user: { id:userId } } });
      expect(assetService.deleteAsset).toHaveBeenCalledWith('pic.png');
      expect(userProfileRepo.remove).toHaveBeenCalledWith(profile);
    });

    it('should delete user profile without picture', async () => {
      const userId = '222';
      const profile = { userId, profilePictureUrl: undefined };

      userProfileRepo.findOne.mockResolvedValue(profile);
      assetService.deleteAsset.mockResolvedValue(undefined);
      userProfileRepo.remove.mockResolvedValue(undefined);

      await service.deleteUserProfile(userId);

      expect(assetService.deleteAsset).not.toHaveBeenCalled();
      expect(userProfileRepo.remove).toHaveBeenCalledWith(profile);
    });

    it('should throw if user profile not found', async () => {
      const userId = 'notfound';
      userProfileRepo.findOne.mockResolvedValue(undefined);

      await expect(service.deleteUserProfile(userId)).rejects.toThrow(
        `User profile not found for user ID: ${userId}`
      );
    });
  });
});