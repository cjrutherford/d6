/**
 * Controller for user profile endpoints.
 * Handles CRUD operations for user profiles and requires authentication.
 */
import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../authentication/auth/auth.guard';
import { CreateUserProfileDto } from '../database/entities';
import User, { UserType } from '../authentication/user.decorator';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    /**
     * Injects the UsersService for user profile logic.
     */
    constructor(private readonly usersService: UsersService) {}

    /**
     * Gets the authenticated user's profile.
     * @param user The authenticated user
     * @returns The user's profile
     */
    @Get()
    async getUserProfile(@User() user: UserType) {
        if (!user?.userId) {
            throw new Error('User not authenticated');
        }
        return await this.usersService.getUserProfile(user.userId);
    }

    /**
     * Creates a new user profile for the authenticated user.
     * @param user The authenticated user
     * @param profileData The profile data
     * @returns The created user profile
     */
    @Post()
    async createUserProfile(@User() user: UserType, @Body() profileData: CreateUserProfileDto) {
        if (!user?.userId) {
            throw new Error('User not authenticated');
        }
        return await this.usersService.createUserProfile(user.userId, profileData);
    }

    /**
     * Updates the authenticated user's profile.
     * @param user The authenticated user
     * @param profileData The updated profile data
     * @returns The updated user profile
     */
    @Put('')
    async updateUserProfile(@User() user: UserType, @Body() profileData: CreateUserProfileDto) {
        if (!user?.userId) {
            throw new Error('User not authenticated');
        }
        return await this.usersService.updateUserProfile(user.userId, profileData);
    }

    /**
     * Deletes the authenticated user's profile.
     * @param user The authenticated user
     * @returns The result of the deletion
     */
    @Delete()
    async deleteUserProfile(@User() user: UserType) {
        if (!user?.userId) {
            throw new Error('User not authenticated');
        }
        return await this.usersService.deleteUserProfile(user.userId);
    }
}
