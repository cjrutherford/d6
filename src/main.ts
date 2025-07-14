import * as express from 'express';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { setupStatic } from './serve-static';
import { ConfigService } from '@nestjs/config';

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  console.log(`[main.ts] NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`[main.ts] DB_HOST: ${configService.get<string>('DB_HOST')}`);
  console.log(`[main.ts] DB_PORT: ${configService.get<number>('DB_PORT')}`);
  console.log(`[main.ts] DB_USERNAME: ${configService.get<string>('DB_USERNAME')}`);
  console.log(`[main.ts] DB_PASSWORD: ${configService.get<string>('DB_PASSWORD')}`);
  console.log(`[main.ts] DB_NAME: ${configService.get<string>('DB_NAME')}`);

  // if(process.env.NODE_ENV === 'production') {
    setupStatic(app);
  // }
  app.setGlobalPrefix('api');  
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  await app.listen(parseInt(process.env.PORT || '4000', 10));
}


