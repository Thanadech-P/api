import { Module } from '@nestjs/common';
import { StocksparelogService } from './stocksparelog.service';
import { StocksparelogController } from './stocksparelog.controller';
import { PrismaService } from 'prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [StocksparelogController],
  providers: [StocksparelogService,PrismaService],
  imports:[JwtModule]
})
export class StocksparelogModule {}
