import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/configs';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { RefreshStrategy } from './refresh.strategy';
import { PrismaService } from 'prisma.service';
@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: config.jwt_secret_key,
      signOptions: {
        expiresIn: '30m',
      },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    PrismaService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
