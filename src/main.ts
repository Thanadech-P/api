import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { config as configs } from './configs/index'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors(configs.cors_option)
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Tgt Api')
    .setDescription('')
    .setVersion('1.0')
    .addTag('tgt')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
