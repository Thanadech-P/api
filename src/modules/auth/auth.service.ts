import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import jwt = require('jsonwebtoken')
// import jwtService from 'jsonwebtoken'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      // return result;
      return {
        access_token: jwt.sign(result, process.env.TOKEN_KEY),
      };
    }
    return {
      res_code: '9999',
      res_desc: 'Username or Password Incorrect!!'
    };
  }
}
