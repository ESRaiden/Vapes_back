import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Usamos HydratedDocument en lugar de extends Document
export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  brand: string; // ej. Maskking, ElfBar

  @Prop({ required: true })
  model: string; // ¡Ahora sí podemos usar esta palabra sin que choque!

  @Prop({ required: true })
  flavor: string; // ej. Mango Ice

  @Prop({ required: true, unique: true })
  sku: string; // Código único de barras o identificador

  @Prop({ required: true })
  price: number; // Precio de venta al público

  @Prop({ type: Object, default: { available: 0, defective: 0 } })
  stock: {
    available: number;
    defective: number;
  };

  @Prop({ default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);