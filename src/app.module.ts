import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { StocksModule } from './modules/stocks/stocks.module';
import { PartnerModule } from './modules/partner/partner.module';
@Module({
  imports: [AuthModule, UsersModule, PurchaseModule, StocksModule, PartnerModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
