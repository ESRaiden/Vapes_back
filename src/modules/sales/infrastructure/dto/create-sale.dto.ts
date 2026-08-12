import { IsArray, IsMongoId, IsNumber, IsString, Min, ValidateNested, ArrayNotEmpty, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

class SaleItemDto {
  @IsMongoId() // Valida que sea un ID real de MongoDB
  productId: string;

  @IsNumber()
  @Min(1) // No puedes vender 0 o menos productos
  quantity: number;

  @IsNumber()
  @Min(0)
  priceAtMoment: number;
}

export class CreateSaleDto {
  @IsArray()
  @ArrayNotEmpty() // La venta debe tener al menos un producto
  @ValidateNested({ each: true })
  @Type(() => SaleItemDto)
  items: SaleItemDto[];

  @IsNumber()
  @Min(0)
  totalAmount: number;

  @IsString()
  @IsIn(['efectivo', 'transferencia', 'tarjeta']) // Restringimos los métodos de pago aceptados
  paymentMethod: string;
}