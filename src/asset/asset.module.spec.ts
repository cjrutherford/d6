import { Test, TestingModule } from '@nestjs/testing';
import { AssetModule } from './asset.module';
import { AssetService } from './asset.service';
import { ConfigService } from '@nestjs/config';

describe('AssetModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        AssetService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'ASSET_PATH') {
                return '/mock/asset/path';
              }
              return null;
            }),
          },
        },
      ],
      exports: [AssetService],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide AssetService', () => {
    const assetService = module.get<AssetService>(AssetService);
    expect(assetService).toBeDefined();
  });
});