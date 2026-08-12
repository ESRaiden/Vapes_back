import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../domain/product.schema';
import { ProductsController } from './products.controller';
import { ProductsService } from '../application/products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], // ¡NUEVO! Esto permite que otros módulos usen este servicio
})
export class ProductsModule {}