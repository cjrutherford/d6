import { Inject, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateDailySixDto, DailySixDto, DailySixEntity, UpdateDailySixDto, UserEntity } from '../database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class DailySixService {
    constructor(
        @Inject(getRepositoryToken(UserEntity)) private readonly userRepository: Repository<UserEntity>,
        @Inject(getRepositoryToken(DailySixEntity)) private readonly dailySixRepository: Repository<DailySixEntity>
    ) {}

    async createDailySix(userId: string, dailySixData: CreateDailySixDto): Promise<DailySixEntity> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        const finalDto = {
            ...dailySixData,
            user
        }
        const dailySix = this.dailySixRepository.create(finalDto);
        return await this.dailySixRepository.save(dailySix);
    }

    async getDailySixByUserId(userId: string): Promise<DailySixEntity[]> {
        return this.dailySixRepository.find({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' }
        });
    }

    async updateDailySix(id: string, updateData: UpdateDailySixDto): Promise<DailySixEntity> {
        const dailySix = await this.dailySixRepository.findOne({ where: { id } });
        if (!dailySix) {
            throw new Error('Daily Six entry not found');
        }

        Object.assign(dailySix, updateData);
        return this.dailySixRepository.save(dailySix);
    }
    
    async queryDailySix(query: UpdateDailySixDto): Promise<DailySixDto[]> {
        const queryBuilder = this.dailySixRepository.createQueryBuilder('dailySix')
        .leftJoinAndSelect('dailySix.user', 'user');

        if (query.public !== undefined) {
            queryBuilder.andWhere('dailySix.public = :public', { public: query.public });
        }
        queryBuilder.orderBy('dailySix.createdAt', 'DESC');

        const initialResults = await queryBuilder.getMany();
        return initialResults.map(({
             id, 
             affirmation, 
             judgement, 
             nonJudgement, 
             mindfulActivity,
             gratitude,
             public: isPublic, 
             user,
             createdAt 
            }) => ({
            id,
            affirmation,
            judgement,
            nonJudgement,
            mindfulActivity,
            gratitude,
            public: isPublic ?? false,
            userId: user.id,
            createdAt
        })) as DailySixDto[];
    }

    async deleteDailySix(id: string): Promise<void> {
        const dailySix = await this.dailySixRepository.findOne({ where: { id } });
        if (!dailySix) {
            throw new Error('Daily Six entry not found');
        }
        await this.dailySixRepository.remove(dailySix);
    }

}
