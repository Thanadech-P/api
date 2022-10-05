import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post()
  create(@Body() auth: any) {
    /**
     * '--- create validate user -----'
     */
    if (auth) {
      try {
        return this.authService.validateUser(auth.username, auth.password);
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
