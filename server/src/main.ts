import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { initSecurityConfig } from './startup/security.config';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config({ path: 'config/.env' });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('MyTicket API')
    .setDescription('The MyTicket API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  initSecurityConfig(app);

  await app.listen(3000);
}
bootstrap();
