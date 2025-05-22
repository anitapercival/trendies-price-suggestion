import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts() {
    return this.prisma.product.findMany();
  }

  async getProductById(id: string) {
    const numericId = Number(id);

    if (isNaN(numericId)) {
      throw new NotFoundException(`Invalid product ID: ${id}`);
    }

    const product = await this.prisma.product.findUnique({
      where: { id: numericId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }
}
