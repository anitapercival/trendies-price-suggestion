import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { SerpapiService } from '../serpapi/serpapi.service';

@Module({
  controllers: [MarketController],
  providers: [SerpapiService],
})
export class MarketModule {}
