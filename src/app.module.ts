import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './modules/users/users.controller';
import { AuthController } from './modules/auth/auth.controller';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
import { AuthService } from './modules/auth/auth.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, PrismaService, UsersService, AuthService],
})
export class AppModule { }
