import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { setupStatic } from './serve-static';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // if(process.env.NODE_ENV === 'production') {
    setupStatic(app);
  // }
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
