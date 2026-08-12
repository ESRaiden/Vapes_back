import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../domain/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(productData: any): Promise<Product> {
    const newProduct = new this.productModel(productData);
    return newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    
    if (!product) {
      throw new NotFoundException(`El vape con ID ${id} no existe en el inventario.`);
    }
    
    return product;
  }

  async update(id: string, updateData: any): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).exec();

    if (!updatedProduct) {
      throw new NotFoundException(`El vape con ID ${id} no existe en el inventario.`);
    }
    
    return updatedProduct;
  }

  async remove(id: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    
    if (!deletedProduct) {
      throw new NotFoundException(`El vape con ID ${id} no existe para ser eliminado.`);
    }
    
    return { message: 'Vape eliminado correctamente del inventario.' };
  }

  // MÉTODO NUEVO: Restar stock de una venta
  async decrementStock(id: string, quantity: number): Promise<void> {
    const product = await this.productModel.findById(id).exec();
    
    if (!product) {
      throw new NotFoundException(`El vape con ID ${id} no existe.`);
    }

    if (product.stock.available < quantity) {
      throw new BadRequestException(`Stock insuficiente. Solo quedan ${product.stock.available} piezas.`);
    }

    product.stock.available -= quantity;
    await product.save();
  }
}