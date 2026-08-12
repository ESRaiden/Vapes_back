import { IsString, IsNumber, IsOptional, ValidateNested, IsBoolean, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class StockDto {
  @IsNumber()
  @Min(0) // El stock nunca puede ser menor a 0
  available: number;

  @IsNumber()
  @Min(0)
  defective: number;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  flavor: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @Min(0) // No regalamos vapes, el precio mínimo es 0
  price: number;

  @ValidateNested()
  @Type(() => StockDto)
  stock: StockDto;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}