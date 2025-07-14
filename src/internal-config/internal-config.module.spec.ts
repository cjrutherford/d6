import { Test, TestingModule } from '@nestjs/testing';
import { InternalConfigModule } from './internal-config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import {
  DailyFourEntity,
  DailySixEntity,
  SaltEntity,
  TokenEntity,
  UserEntity,
  UserProfileEntity
} from '../database/entities';

import 'reflect-metadata'; // Import reflect-metadata for TypeORM decorators


describe('InternalConfigModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
      remove: jest.fn(),
    };

    const mockDataSource = {
      getRepository: jest.fn((entity) => mockRepository),
    };

    module = await Test.createTestingModule({
      imports: [InternalConfigModule],
    })
    .overrideProvider('D6_CONNECTION')
    .useValue(mockDataSource)
    .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should export ConfigModule', () => {
    expect(module.get(ConfigService)).toBeDefined();
  });

  it('should export UserEntity repository', () => {
    expect(module.get(getRepositoryToken(UserEntity))).toBeDefined();
  });

  it('should export TokenEntity repository', () => {
    expect(module.get(getRepositoryToken(TokenEntity))).toBeDefined();
  });

  it('should export SaltEntity repository', () => {
    expect(module.get(getRepositoryToken(SaltEntity))).toBeDefined();
  });

  it('should export UserProfileEntity repository', () => {
    expect(module.get(getRepositoryToken(UserProfileEntity))).toBeDefined();
  });

  it('should export DailySixEntity repository', () => {
    expect(module.get(getRepositoryToken(DailySixEntity))).toBeDefined();
  });

  it('should export DailyFourEntity repository', () => {
    expect(module.get(getRepositoryToken(DailyFourEntity))).toBeDefined();
  });
});
