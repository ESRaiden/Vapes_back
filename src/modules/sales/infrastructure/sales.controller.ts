import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { SalesService } from '../application/sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Controller('api/sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  // NUEVA RUTA: Reporte del día
  @Get('report/daily')
  async getDailyReport(@Query('date') date?: string) {
    return this.salesService.getDailyReport(date);
  }

  @Get()
  async findAll() {
    return this.salesService.findAll();
  }
}