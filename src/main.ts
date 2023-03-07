import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Open Shelter API')
    .setDescription('This is the playground for the Open Shelter API')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  app.enableCors({
    //origin: 'https://web-service-hnlijallya-oa.a.run.app',
    origin: '*',
  });
  app.enableVersioning();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
