import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AssetModule } from './asset/asset.module';
import { DailySixModule } from './daily-six/daily-six.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthenticationModule, 
    UsersModule, 
    AssetModule, DailySixModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
