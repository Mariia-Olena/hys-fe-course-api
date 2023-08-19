import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.enableCors({
    allowedHeaders: '*',
    exposedHeaders: '*',
    origin: '*',
    credentials: true,
    "preflightContinue": false,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS']
  });

  await app.listen(3000);
}
bootstrap();
