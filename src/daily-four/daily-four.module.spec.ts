import { Test, TestingModule } from '@nestjs/testing';
import { DailyFourModule } from './daily-four.module';
import { DailyFourController } from './daily-four.controller';
import { DailyFourService } from './daily-four.service';
import { Module } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity, DailyFourEntity, TokenEntity } from '../database/entities';
import { ConfigService } from '@nestjs/config';
import { InternalConfigModule } from '../internal-config/internal-config.module';

// Mock InternalConfigModule
@Module({
  providers: [
    {
      provide: getRepositoryToken(UserEntity),
      useValue: {
        findOne: jest.fn(),
      },
    },
    {
      provide: getRepositoryToken(DailyFourEntity),
      useValue: {
        save: jest.fn(),
        findOne: jest.fn(),
        find: jest.fn(),
        createQueryBuilder: jest.fn(),
        remove: jest.fn(),
        create: jest.fn(),
      },
    },
    {
      provide: ConfigService,
      useValue: {
        get: jest.fn(),
      },
    },
    {
      provide: getRepositoryToken(TokenEntity),
      useValue: {
        findOne: jest.fn(),
      },
    },
  ],
  exports: [
    getRepositoryToken(UserEntity),
    getRepositoryToken(DailyFourEntity),
    getRepositoryToken(TokenEntity),
    ConfigService,
  ],
})
class MockInternalConfigModule {}

describe('DailyFourModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DailyFourModule],
    })
    .overrideModule(InternalConfigModule)
    .useModule(MockInternalConfigModule)
    .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have DailyFourController defined', () => {
    const controller = module.get<DailyFourController>(DailyFourController);
    expect(controller).toBeDefined();
  });

  it('should have DailyFourService defined', () => {
    const service = module.get<DailyFourService>(DailyFourService);
    expect(service).toBeDefined();
  });
});
