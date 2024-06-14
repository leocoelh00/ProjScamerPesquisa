import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenvFlow = require('dotenv-flow');

async function bootstrap() {
  dotenvFlow.config();

  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  app.enableCors();
  
  await app.listen(3000);
}
bootstrap();
