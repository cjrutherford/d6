import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import UserEntity from "./user.entity";

@Entity()
export default class DailySixEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @ManyToOne(type => UserEntity, ue => ue.dailySixes)
    user: UserEntity;

    @Column()
    affirmation: string;

    @Column()
    plannedPleasurable: string;

    @Column()
    judgement: string;

    @Column()
    nonJudgement: string;

    @Column()
    mindfulActivity: string;

    @Column()
    gratitude: string;

    @Column({ default: false })
    public: boolean;
}

export interface DailySixDto {
    id: string;
    createdAt: Date;
    userId: string;
    affirmation: string;
    plannedPleasurable: string;
    judgement: string;
    nonJudgement: string;
    mindfulActivity: string;
    gratitude: string;
    public: boolean;
}

export interface CreateDailySixDto {
    affirmation: string;
    plannedPleasurable: string;
    judgement: string;
    nonJudgement: string;
    mindfulActivity: string;
    gratitude: string;
    public?: boolean;
}
export interface UpdateDailySixDto {
    affirmation?: string;
    plannedPleasurable?: string;
    judgement?: string;
    nonJudgement?: string;
    mindfulActivity?: string;
    gratitude?: string;
    public?: boolean;
}