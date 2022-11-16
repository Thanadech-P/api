import { Module } from '@nestjs/common';
import { StockspareService } from './stockspare.service';
import { StockspareController } from './stockspare.controller';
import { PrismaService } from 'prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  controllers: [StockspareController],
  providers: [StockspareService, PrismaService, JwtService, JwtStrategy]
})
export class StockspareModule {}
