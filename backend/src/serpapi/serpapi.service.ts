import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

interface ShoppingResult {
  price?: string;
}

interface SerpApiResponse {
  shopping_results?: ShoppingResult[];
}

@Injectable()
export class SerpapiService {
  private readonly API_URL = 'https://serpapi.com/search.json';
  private readonly API_KEY: string;

  constructor(private configService: ConfigService) {
    this.API_KEY = this.configService.get<string>('SERPAPI_KEY', '');
    if (!this.API_KEY) {
      throw new Error('SERPAPI_KEY is not defined in environment variables.');
    }
  }

  async getMarketPrices(productQuery: string): Promise<number[]> {
    try {
      const params = {
        engine: 'google_shopping',
        q: productQuery,
        api_key: this.API_KEY,
      };

      const response = await axios.get<SerpApiResponse>(this.API_URL, {
        params,
      });
      const data = response.data;

      const prices: number[] = [];

      if (data.shopping_results) {
        for (const item of data.shopping_results) {
          if (item.price) {
            const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
            if (!isNaN(price)) {
              prices.push(price);
            }
          }
        }
      }

      return prices;
    } catch {
      throw new HttpException(
        'Failed to fetch market prices',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  suggestPrices(prices: number[]): {
    minBid: number | null;
    buyNow: number | null;
  } {
    if (!prices.length) return { minBid: null, buyNow: null };

    const sorted = prices.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median =
      sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];

    const minBid = Math.floor(median * 0.7); // 70% of median
    const buyNow = Math.round(median * 1.1); // 110% of median

    return { minBid, buyNow };
  }
}
