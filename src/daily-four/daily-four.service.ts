import { Inject, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateDailyFourDto, DailyFourEntity, UpdateDailyFourDto, UserEntity } from '../database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class DailyFourService {
    constructor(
        @Inject(getRepositoryToken(UserEntity)) private readonly userRepository: Repository<UserEntity>,
        @Inject(getRepositoryToken(DailyFourEntity)) private readonly dailyFourRepository: Repository<DailyFourEntity>   
    ) {}

    async createDailyFour(userId: string, createDailyFourDto: CreateDailyFourDto): Promise<DailyFourEntity> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        const dailyFour = this.dailyFourRepository.create({
            ...createDailyFourDto,
            user
        });

        return this.dailyFourRepository.save(dailyFour);
    }

    async getDailyFourByUserId(userId: string): Promise<DailyFourEntity[]> {
        return this.dailyFourRepository.find({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' }
        });
    }

    async updateDailyFour(id: string, updateDailyFourDto: Partial<CreateDailyFourDto>): Promise<DailyFourEntity> {
        const dailyFour = await this.dailyFourRepository.findOne({ where: { id } });
        if (!dailyFour) {
            throw new Error('Daily Four entry not found');
        }

        Object.assign(dailyFour, updateDailyFourDto);
        return this.dailyFourRepository.save(dailyFour);
    }

    async queryDailyFour(query: UpdateDailyFourDto): Promise<DailyFourEntity[]> {
        const queryBuilder = this.dailyFourRepository.createQueryBuilder('dailyFour')
            .leftJoinAndSelect('dailyFour.user', 'user');

        if (query.public !== undefined) {
            queryBuilder.andWhere('dailyFour.public = :public', { public: query.public });
        }
        queryBuilder.orderBy('dailyFour.createdAt', 'DESC');

        return queryBuilder.getMany();
    }

    async deleteDailyFour(id: string): Promise<void> {
        const dailyFour = await this.dailyFourRepository.findOne({ where: { id } });
        if (!dailyFour) {
            throw new Error('Daily Four entry not found');
        }

        await this.dailyFourRepository.remove(dailyFour);
    }
}


