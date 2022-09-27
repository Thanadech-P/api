import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto) {
    console.log('--- create validate user -----')
    if (createAuthDto){
      return this.authService.validateUser(createAuthDto.username, createAuthDto.password);
    }else {
      return {
        res_code: '9999',
        res_desc: 'Username or Password Not Found'
      };
    }
  }
}
