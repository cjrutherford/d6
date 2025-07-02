import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { DailySixService } from './daily-six.service';
import User, { UserType } from '../authentication/user.decorator';
import { CreateDailySixDto, UpdateDailySixDto } from '../database/entities';

@Controller('daily-six')
export class DailySixController {

    constructor(private readonly dailySixService: DailySixService) {}

    @Get()
    async getDailySixByUserId(@User() user: UserType) {
        return this.dailySixService.getDailySixByUserId(user.userId);
    }


    @Post()
    async createDailySix(@User() user: UserType, @Body() createDailySixDto: CreateDailySixDto) {
        return this.dailySixService.createDailySix(user.userId, createDailySixDto);
    }

    @Patch()
    async updateDailySix(@User() user: UserType, @Body() updateDailySixDto: UpdateDailySixDto) {
        return this.dailySixService.updateDailySix(user.userId, updateDailySixDto);
    }

    @Post('query')
    async queryDailySix(@Body() query: UpdateDailySixDto) {
        return this.dailySixService.queryDailySix(query);
    }

    @Delete()
    async deleteDailySix(@User() user: UserType, @Body('id') id: string) {
        return this.dailySixService.deleteDailySix(id);
    }
}
