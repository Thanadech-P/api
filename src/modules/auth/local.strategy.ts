import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUserCredentials(username, password);
    if (!user) {
      throw new UnauthorizedException('ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง');
    }
    return user;
  }
}