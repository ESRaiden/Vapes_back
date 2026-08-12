import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../domain/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  // 1. Crear un nuevo Vape (POST)
  async create(productData: any): Promise<Product> {
    const newProduct = new this.productModel(productData);
    return newProduct.save();
  }

  // 2. Listar todos los Vapes (GET)
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // 3. Buscar un solo vape por su ID (GET específico)
  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    
    if (!product) {
      throw new NotFoundException(`El vape con ID ${id} no existe en el inventario.`);
    }
    
    return product;
  }

  // 4. Actualizar un producto (PATCH)
  async update(id: string, updateData: any): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Garantiza que Mongo nos devuelva el objeto ya actualizado
    ).exec();

    if (!updatedProduct) {
      throw new NotFoundException(`El vape con ID ${id} no existe en el inventario.`);
    }
    
    return updatedProduct;
  }

  // 5. Eliminar un vape del sistema (DELETE)
  async remove(id: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    
    if (!deletedProduct) {
      throw new NotFoundException(`El vape con ID ${id} no existe para ser eliminado.`);
    }
    
    return { message: 'Vape eliminado correctamente del inventario.' };
  }
}