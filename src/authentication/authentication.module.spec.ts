import { SaltEntity, TokenEntity, UserEntity } from '../database/entities';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationModule } from './authentication.module';
import { ConfigService } from '@nestjs/config';
import { InternalConfigModule } from '../internal-config/internal-config.module';
import { getRepositoryToken } from '@nestjs/typeorm';

// Mock InternalConfigModule
jest.mock('../internal-config/internal-config.module', () => ({
  InternalConfigModule: class MockInternalConfigModule {},
}));

describe('AuthenticationModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    const mockUserRepo = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    const mockTokenRepo = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
    };
    const mockSaltRepo = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    const mockConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'APPLICATION_ENCRYPTION_SEED') {
          return 'test_secret';
        }
        return null;
      }),
    };

    module = await Test.createTestingModule({
      imports: [InternalConfigModule],
      controllers: [AuthenticationController],
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useFactory: (userRepo, tokenRepo, saltRepo, configService) => {
            return new AuthService(userRepo, tokenRepo, saltRepo, configService);
          },
          inject: [
            getRepositoryToken(UserEntity),
            getRepositoryToken(TokenEntity),
            getRepositoryToken(SaltEntity),
            ConfigService,
          ],
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepo,
        },
        {
          provide: getRepositoryToken(TokenEntity),
          useValue: mockTokenRepo,
        },
        {
          provide: getRepositoryToken(SaltEntity),
          useValue: mockSaltRepo,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have AuthenticationController', () => {
    const controller = module.get<AuthenticationController>(AuthenticationController);
    expect(controller).toBeDefined();
  });

  it('should have AuthService', () => {
    const service = module.get<AuthService>(AuthService);
    expect(service).toBeDefined();
  });

  it('should have AuthGuard', () => {
    const guard = module.get<AuthGuard>(AuthGuard);
    expect(guard).toBeDefined();
  });
});