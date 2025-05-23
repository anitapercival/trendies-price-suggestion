import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { SerpapiService } from '../serpapi/serpapi.service';

@Controller('market')
export class MarketController {
  constructor(private readonly serpapiService: SerpapiService) {}

  @Get('scan-price')
  async scanPrice(@Query('product') product: string) {
    if (!product) {
      throw new BadRequestException('Missing "product" query parameter');
    }

    const prices = await this.serpapiService.getMarketPrices(product);
    const { minBid, buyNow } = this.serpapiService.suggestPrices(prices);

    return {
      product,
      prices,
      suggestedMinBid: minBid,
      suggestedBuyNow: buyNow,
    };
  }
}
