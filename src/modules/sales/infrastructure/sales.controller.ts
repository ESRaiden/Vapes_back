import { Controller, Post, Get, Body } from '@nestjs/common';
import { SalesService } from '../application/sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Controller('api/sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  async findAll() {
    return this.salesService.findAll();
  }
}