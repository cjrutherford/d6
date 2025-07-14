import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from './users.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AssetService } from '../asset/asset.service';
import { InternalConfigModule } from '../internal-config/internal-config.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import UserProfileEntity from '../database/entities/user-profile.entity';
import { AuthGuard } from '../authentication/auth/auth.guard';

// Mock AssetModule and InternalConfigModule
jest.mock('../asset/asset.module', () => ({
  AssetModule: class MockAssetModule {},
}));
jest.mock('../internal-config/internal-config.module', () => ({
  InternalConfigModule: class MockInternalConfigModule {},
}));

describe('UsersModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    const mockUserProfileRepo = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };
    const mockAssetService = {
      readAsset: jest.fn(),
      saveAsset: jest.fn(),
      deleteAsset: jest.fn(),
    };

    module = await Test.createTestingModule({
      imports: [
        InternalConfigModule,
      ],
      providers: [
        {
          provide: UsersService,
          useFactory: (userProfileRepo, assetService) => {
            return new UsersService(userProfileRepo, assetService);
          },
          inject: [
            getRepositoryToken(UserProfileEntity),
            AssetService,
          ],
        },
        {
          provide: getRepositoryToken(UserProfileEntity),
          useValue: mockUserProfileRepo,
        },
        {
          provide: AssetService,
          useValue: mockAssetService,
        },
      ],
      controllers: [UsersController],
    })
    .overrideGuard(AuthGuard) // Override AuthGuard
    .useValue({ canActivate: () => true }) // Mock canActivate method
    .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have UsersController', () => {
    const controller = module.get<UsersController>(UsersController);
    expect(controller).toBeDefined();
  });

  it('should have UsersService', () => {
    const service = module.get<UsersService>(UsersService);
    expect(service).toBeDefined();
  });
});