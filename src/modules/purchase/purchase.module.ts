import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { StocksService } from '../stocks/stocks.service';
import { PurchaseController } from './purchase.controller';
import { PrismaService } from 'prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';


@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService, StocksService, PrismaService, JwtStrategy, JwtService]
})
export class PurchaseModule { }
