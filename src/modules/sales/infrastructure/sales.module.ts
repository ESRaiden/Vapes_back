import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema } from '../domain/sale.schema';
import { SalesController } from './sales.controller';
import { SalesService } from '../application/sales.service';
import { ProductsModule } from '../../products/infrastructure/products.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
    ProductsModule, // Conectamos el módulo de Productos aquí
  ],
  controllers: [SalesController], 
  providers: [SalesService],      
})
export class SalesModule {}