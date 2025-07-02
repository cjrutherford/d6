/**
 * Service for handling user profile logic, including CRUD operations and asset management.
 */
import { Inject, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AssetService } from '../asset/asset.service';
import { UserProfileEntity } from '../database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  /**
   * Constructs the UsersService with injected repositories and asset service.
   */
  constructor(
    @Inject(getRepositoryToken(UserProfileEntity))
    private readonly userProfileRepo: Repository<UserProfileEntity>,
    private readonly assetService: AssetService,
  ) {}

  /**
   * Retrieves a user's profile and returns it with the profile picture as a base64 string.
   * @param userId The user's ID
   * @returns The user's profile entity with base64 profile picture
   * @throws Error if profile or profile picture is not found
   */
  async getUserProfile(userId: string): Promise<UserProfileEntity> {
    const profile = await this.userProfileRepo.findOne({
      where: { user: { id: userId } },
    });
    if (!profile) {
      throw new Error(`User profile not found for user ID: ${userId}`);
    }
    const profileAsset = await this.assetService.readAsset(
      profile.profilePictureUrl!,
    );
    if (!profileAsset) {
      throw new Error(`Profile picture not found for user ID: ${userId}`);
    }
    // Assume PNG for profile pictures; adjust MIME type if needed
    let base64ProfilePicture = `${profileAsset.toString('base64')}`;

    base64ProfilePicture = base64ProfilePicture.replace(
      /^dataimage\/pngbase64,?/i,
      '',
    );
    base64ProfilePicture = `data:image/png;base64,${base64ProfilePicture}`;
    return {
      ...profile,
      profilePictureUrl: base64ProfilePicture,
    };
  }

  /**
   * Creates a new user profile and saves the profile picture asset.
   * @param userId The user's ID
   * @param profileData The profile data (profilePictureUrl as base64 string)
   * @returns The created user profile entity
   * @throws Error if profile already exists or picture is missing
   */
  async createUserProfile(
    userId: string,
    profileData: Partial<UserProfileEntity>,
  ): Promise<UserProfileEntity> {
    const existingProfile = await this.userProfileRepo.findOne({
      where: { user: { id: userId } },
    });
    if (existingProfile) {
      throw new Error(`User profile already exists for user ID: ${userId}`);
    }
    // this should come in as a base64 string, so we need to handle it accordingly
    if (!profileData.profilePictureUrl) {
      throw new Error('Profile picture is required');
    }
    let base64String = profileData.profilePictureUrl;
    if (base64String?.startsWith('data:')) {
      base64String = base64String.split(',')[1];
    }
    const profilePictureBuffer = Buffer.from(base64String, 'base64');
    const profilePictureUrl = await this.assetService.saveAsset(
      `profile-${userId}.png`,
      profilePictureBuffer,
    );
    const newProfile = this.userProfileRepo.create({
      ...profileData,
      profilePictureUrl,
      user: { id: userId },
    });
    const newProfileFinal = await this.userProfileRepo.save(newProfile);
    return newProfileFinal;
  }

  /**
   * Updates an existing user profile with new data.
   * @param userId The user's ID
   * @param profileData The new profile data (profilePictureUrl as base64 string, etc.)
   * @returns The updated user profile entity
   * @throws Error if profile not found
   */
  async updateUserProfile(
    userId: string,
    profileData: Partial<UserProfileEntity>,
  ): Promise<UserProfileEntity> {
    const existingProfile = await this.userProfileRepo.findOne({
      where: { user: { id: userId } },
    });
    if (!existingProfile) {
      throw new Error(`User profile not found for user ID: ${userId}`);
    }
    if (profileData.profilePictureUrl) {
      // we should always have a profile picture, but only one. delete the old one if it exists
      if (existingProfile.profilePictureUrl) {
        await this.assetService.deleteAsset(existingProfile.profilePictureUrl);
      }
      const profilePictureBuffer = Buffer.from(
        profileData.profilePictureUrl,
        'base64',
      );
      const profilePictureUrl = await this.assetService.saveAsset(
        `profile-${userId}.png`,
        profilePictureBuffer,
      );
      existingProfile.profilePictureUrl = profilePictureUrl;
    }
    Object.assign(existingProfile, profileData);
    return await this.userProfileRepo.save(existingProfile);
  }

  /**
   * Deletes a user profile and its associated assets.
   * @param userId The user's ID
   * @throws Error if profile not found
   */
  async deleteUserProfile(userId: string): Promise<void> {
    const existingProfile = await this.userProfileRepo.findOne({
      where: { user: { id: userId } },
    });
    if (!existingProfile) {
      throw new Error(`User profile not found for user ID: ${userId}`);
    }
    if (existingProfile.profilePictureUrl) {
      await this.assetService.deleteAsset(existingProfile.profilePictureUrl);
    }
    await this.userProfileRepo.remove(existingProfile);
  }
}
