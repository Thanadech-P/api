import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/configs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string) {
    const user: any = await this.usersService.findOneUsername(username);
    if (user && user.password === pass) {
      const payload = { username: user.username, sub: user.user_id };
      return {
        access_token: this.jwtService.sign(payload,{secret:config.jwt_secret_key}),
      };
    }
    throw new HttpException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!!', HttpStatus.BAD_REQUEST);
  }
}
