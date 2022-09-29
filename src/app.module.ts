import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './modules/users/users.controller';
import { AuthController } from './modules/auth/auth.controller';
import { PurchaseController } from './modules/purchase/purchase.controller';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
import { AuthService } from './modules/auth/auth.service';
import { PurchaseService } from './modules/purchase/purchase.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController, UsersController, AuthController, PurchaseController],
  providers: [AppService, PrismaService, UsersService, AuthService, PurchaseService],
})
export class AppModule { }
