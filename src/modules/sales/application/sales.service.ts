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

    // 2. Si hay stock suficiente, guardamos el ticket
    const newSale = new this.saleModel(createSaleDto);
    return newSale.save();
  }

  async findAll(): Promise<Sale[]> {
    return this.saleModel.find().exec();
  }

  // MÉTODO NUEVO: Corte de caja diario
  async getDailyReport(dateString?: string): Promise<any> {
    // Si no mandamos fecha, por defecto usa la de hoy
    const targetDate = dateString ? new Date(dateString) : new Date();

    // Establecemos el inicio del día (00:00:00)
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    // Establecemos el fin del día (23:59:59)
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Buscamos todas las ventas que ocurrieron hoy
    const sales = await this.saleModel.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: 'completed', // Solo contamos ventas válidas
    }).exec();

    // Sumamos el dinero de todas esas ventas
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);

    return {
      date: startOfDay.toISOString().split('T')[0], // Formato limpio YYYY-MM-DD
      totalTickets: sales.length,
      totalRevenue,
    };
  }
}