import { Test, TestingModule } from '@nestjs/testing';
import { DailySixModule } from './daily-six.module';
import { DailySixController } from './daily-six.controller';
import { DailySixService } from './daily-six.service';
import { Module } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity, DailySixEntity, TokenEntity } from '../database/entities';
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
      provide: getRepositoryToken(DailySixEntity),
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
    getRepositoryToken(DailySixEntity),
    getRepositoryToken(TokenEntity),
    ConfigService,
  ],
})
class MockInternalConfigModule {}

describe('DailySixModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DailySixModule],
    })
    .overrideModule(InternalConfigModule)
    .useModule(MockInternalConfigModule)
    .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have DailySixController defined', () => {
    const controller = module.get<DailySixController>(DailySixController);
    expect(controller).toBeDefined();
  });

  it('should have DailySixService defined', () => {
    const service = module.get<DailySixService>(DailySixService);
    expect(service).toBeDefined();
  });
});
