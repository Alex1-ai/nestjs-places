import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // so that endpoint receive correct data not invalid data
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
