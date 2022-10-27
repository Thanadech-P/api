import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { StocksService } from '../stocks/stocks.service';
import { PurchaseController } from './purchase.controller';
import { PrismaService } from 'prisma.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService, StocksService, PrismaService, JwtService]
})
export class PurchaseModule { }
