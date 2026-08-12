import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale, SaleDocument } from '../domain/sale.schema';
import { CreateSaleDto } from '../infrastructure/dto/create-sale.dto';
import { ProductsService } from '../../products/application/products.service'; 

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
    private readonly productsService: ProductsService 
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    // 1. Primero, recorremos los items de la venta y descontamos el stock
    for (const item of createSaleDto.items) {
      await this.productsService.decrementStock(item.productId, item.quantity);
    }

    // 2. Si el paso anterior tiene éxito, guardamos el ticket
    const newSale = new this.saleModel(createSaleDto);
    return newSale.save();
  }

  async findAll(): Promise<Sale[]> {
    return this.saleModel.find().exec();
  }
}