import { AssetService } from './asset.service';
/**
 * Module for asset management features, providing the AssetService.
 */
import { Module } from '@nestjs/common';

@Module({
  providers: [AssetService],
  exports: [AssetService],
})
export class AssetModule {}
