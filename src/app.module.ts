import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // 1. Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // Disponible en toda la app sin importarlo de nuevo
    }),
    
    // 2. Conexión a MongoDB Atlas usando la URI del archivo .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    // Aquí importaremos nuestros módulos Hexagonales (Products, Sales, etc.) más adelante
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}