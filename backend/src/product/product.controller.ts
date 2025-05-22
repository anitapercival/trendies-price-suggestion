import {
  Controller,
  Get,
  Query,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Controller('products')
export class ProductController {
  constructor(private readonly prisma: PrismaService) {}

  // GET endpoint 'price-suggestion' to suggest a price based on brand and/or category
  @Get('price-suggestion')
  async getPriceSuggestion(
    @Query('brand') brand: string,
    @Query('category') category: string,
  ): Promise<{ suggestedPrice: number | null }> {
    // Validate that at least one of 'brand' or 'category' is provided
    if (!brand && !category) {
      throw new BadRequestException('Brand or category is required');
    }

    try {
      let prices: number[] = [];

      // If both brand and category are provided, fetch products matching both criteria
      if (brand && category) {
        const both: { price: Decimal }[] = await this.prisma.product.findMany({
          where: { brand, category },
          select: { price: true },
        });
        prices = both.map((p) => p.price.toNumber());
      }

      // If no prices found and category is provided, fetch products matching category only
      if (!prices.length && category) {
        const byCategory: { price: Decimal }[] =
          await this.prisma.product.findMany({
            where: { category },
            select: { price: true },
          });
        prices = byCategory.map((p) => p.price.toNumber());
      }

      // If still no prices found and brand is provided, fetch products matching brand only
      if (!prices.length && brand) {
        const byBrand: { price: Decimal }[] =
          await this.prisma.product.findMany({
            where: { brand },
            select: { price: true },
          });
        prices = byBrand.map((p) => p.price.toNumber());
      }

      if (!prices.length) {
        return { suggestedPrice: null };
      }

      // Calculate average price by summing all prices and dividing by the count and round to the nearest integer
      const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
      return { suggestedPrice: avg };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to get price suggestion');
    }
  }
}
