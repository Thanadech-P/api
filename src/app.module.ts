import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { StocksModule } from './modules/stocks/stocks.module';
import { PartnerModule } from './modules/partner/partner.module';
import { StockspareModule } from './modules/stockspare/stockspare.module';
import { PrismaService } from 'prisma.service';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { CategoryModule } from './modules/category/category.module';
@Module({
  imports: [AuthModule, UsersModule, PurchaseModule, StocksModule, PartnerModule, StockspareModule, VehicleModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule { }
