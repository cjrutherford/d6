import { AssetModule } from '../asset/asset.module';
import { InternalConfigModule } from '../internal-config/internal-config.module';
/**
 * Module for user profile features, including controller and service.
 * Imports asset and internal config modules for dependencies.
 */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    AssetModule,
    InternalConfigModule,
  ],
  providers: [
        UsersService,
    ],
  controllers: [UsersController],
})
export class UsersModule {}
