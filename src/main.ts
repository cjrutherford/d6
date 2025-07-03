import * as express from 'express';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { setupStatic } from './serve-static';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // if(process.env.NODE_ENV === 'production') {
    setupStatic(app);
  // }
  app.setGlobalPrefix('api');  
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
