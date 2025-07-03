import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import UserEntity from "./user.entity";

@Entity()
export default class DailyFourEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(type => UserEntity, ue => ue.dailyFours)
    user: UserEntity;

    @Column()
    affirmation: string;

    @Column()
    plannedPleasurable: string;

    @Column()
    mindfulActivity: string;

    @Column()
    gratitude: string;

    @Column({ default: false })
    public: boolean;
}

export interface DailyFourDto {
    id: string;
    createdAt: Date;
    userId: string;
    affirmation: string;
    plannedPleasurable: string;
    mindfulActivity: string;
    gratitude: string;
    public: boolean;
}

export interface CreateDailyFourDto {
    affirmation: string;
    plannedPleasurable: string;
    mindfulActivity: string;
    gratitude: string;
    public?: boolean;
}

export interface UpdateDailyFourDto {
    affirmation?: string;
    plannedPleasurable?: string;
    mindfulActivity?: string;
    gratitude?: string;
    public?: boolean;
}