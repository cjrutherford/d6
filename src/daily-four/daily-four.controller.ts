import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { DailyFourService } from './daily-four.service';
import { AuthGuard } from '../authentication/auth/auth.guard';
import User, { UserType } from '../authentication/user.decorator';
import { CreateDailyFourDto, UpdateDailyFourDto } from '../database/entities';

@UseGuards(AuthGuard)
@Controller('daily-four')
export class DailyFourController {
    constructor(private readonly dailyFourService: DailyFourService) {}

    @Post()
    async createDailyFour(@User() user: UserType, @Body() createDailyFourDto: CreateDailyFourDto) {
        return this.dailyFourService.createDailyFour(user.userId, createDailyFourDto);
    }

    @Get()
    async getDailyFourByUserId(@User() user: UserType) {
        return this.dailyFourService.getDailyFourByUserId(user.userId);
    }

    @Patch()
    async updateDailyFour(@User() user: UserType, @Body() updateDailyFourDto: UpdateDailyFourDto) {
        return this.dailyFourService.updateDailyFour(user.userId, updateDailyFourDto);
    }

    @Post('query')
    async queryDailyFour(@Body() query: UpdateDailyFourDto) {
        return this.dailyFourService.queryDailyFour(query);
    }

    @Delete()
    async deleteDailyFour(@User() user: UserType, @Body('id') id: string) {
        return this.dailyFourService.deleteDailyFour(id);
    }
}
