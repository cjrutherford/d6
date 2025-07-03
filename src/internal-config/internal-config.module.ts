import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    DailyFourEntity,
    DailySixEntity,
    SaltEntity,
    TokenEntity,
    UserEntity,
    UserProfileEntity
} from '../database/entities';

import { DataSource } from 'typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [() => {
                return {
                    DB_HOST: process.env.DB_HOST || 'localhost',
                    DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
                    DB_USERNAME: process.env.DB_USERNAME || 'postgres',
                    DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
                    DB_DB: process.env.DB_DB || 'd6',
                    APPLICATION_ENCRIPTION_SEED: process.env.APPLICATION_ENCRIPTION_SEED || 'default_seed',
                    ASSET_PATH: process.env.ASSET_PATH || '/assets',
                }
            }]
        }),
        DatabaseModule.register({
            name: 'd6', 
            factory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get<string>('DB_HOST'),
                port: config.get<number>('DB_PORT'),
                username: config.get<string>('DB_USERNAME'),
                password: config.get<string>('DB_PASSWORD'),
                database: config.get<string>('DB_NAME'),
                entities: [
                    UserEntity,
                    SaltEntity,
                    TokenEntity,
                    UserProfileEntity,
                    DailySixEntity,
                    DailyFourEntity,
                ],
                synchronize: true,
                logging: false
            })
        })
    ],
    exports: [
        ConfigModule,
        getRepositoryToken(UserEntity),
        getRepositoryToken(TokenEntity),
        getRepositoryToken(SaltEntity),
        getRepositoryToken(UserProfileEntity),
        getRepositoryToken(DailySixEntity),
        getRepositoryToken(DailyFourEntity)
    ],
    providers: [
        {
            provide: getRepositoryToken(UserEntity),
            useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
            inject: ['D6_CONNECTION'],
        },{
            provide: getRepositoryToken(TokenEntity),
            useFactory: (dataSource: DataSource) => dataSource.getRepository(TokenEntity),
            inject: ['D6_CONNECTION'],
        },{
            provide: getRepositoryToken(SaltEntity),
            useFactory: (dataSource: DataSource) => dataSource.getRepository(SaltEntity),
            inject: ['D6_CONNECTION'],
        },{
            provide: getRepositoryToken(UserProfileEntity),
            useFactory: (dataSource: DataSource) => dataSource.getRepository(UserProfileEntity),
            inject: ['D6_CONNECTION'],
        },{
            provide: getRepositoryToken(DailySixEntity),
            useFactory: (dataSource: DataSource) => dataSource.getRepository(DailySixEntity),
            inject: ['D6_CONNECTION'],
        },{
            provide: getRepositoryToken(DailyFourEntity),
            useFactory: (dataSource: DataSource) => dataSource.getRepository(DailyFourEntity),
            inject: ['D6_CONNECTION'],
        }
    ]
})
export class InternalConfigModule { }
