import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MongoExceptionFilter } from './common/filters/mongo-exception.filter'; // Importamos el filtro

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableCors();

  // Escudo de entrada (DTOs)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Escudo de salida (Filtro de errores de Mongo)
  app.useGlobalFilters(new MongoExceptionFilter());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  logger.log(`🚀 Backend corriendo en http://localhost:${port}`);
}
bootstrap();