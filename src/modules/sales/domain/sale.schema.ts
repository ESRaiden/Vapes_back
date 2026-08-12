import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SaleDocument = HydratedDocument<Sale>;

@Schema({ timestamps: true }) // Nos dará createdAt (fecha de venta) automáticamente
export class Sale {
  // Arreglo con los productos que se llevaron en esta venta
  @Prop({
    type: [{
      productId: { type: Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      priceAtMoment: { type: Number, required: true } // El precio que se cobró ese día
    }],
    required: true
  })
  items: Array<{ productId: Types.ObjectId; quantity: number; priceAtMoment: number }>;

  @Prop({ required: true })
  totalAmount: number; // La suma total del ticket

  @Prop({ required: true })
  paymentMethod: string; // ej. 'efectivo', 'transferencia', 'tarjeta'

  @Prop({ default: 'completed' })
  status: string; // 'completed' o 'cancelled' (por si hay devoluciones)
}

export const SaleSchema = SchemaFactory.createForClass(Sale);