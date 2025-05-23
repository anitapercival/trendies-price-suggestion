import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { SerpapiService } from './serpapi/serpapi.service';
import { ConfigModule } from '@nestjs/config';
import { MarketController } from './market/market.controller';
import { MarketModule } from './market/market.module';

@Module({
  imports: [
    PrismaModule,
    ProductModule,
    MarketModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, MarketController],
  providers: [AppService, SerpapiService],
})
export class AppModule {}
