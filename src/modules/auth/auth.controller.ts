import { Controller, Get, Post, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Req() req: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    /**
     * create validate user
     */
    const token = await this.authService.getJwtToken(req.user);
    const refreshToken = await this.authService.getRefreshToken(
      req.user.id,
    );
    const authData = {
      token,
      refreshToken,
    };
    response.cookie('auth-cookie', authData, { sameSite: 'none', secure: true })

    return { msg: 'success' };
  }

  @UseGuards(AuthGuard('local'))
  @Post('logout')
  async logut(
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie('auth-cookie')

    return { msg: 'User Logout' };
  }

  @Get('refresh-token')
  @UseGuards(AuthGuard('refresh'))
  async regenerateTokens(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.getJwtToken(req.user);
    const refreshToken = await this.authService.getRefreshToken(
      req.user.id,
    );
    const secretData = {
      token,
      refreshToken,
    };

    res.cookie('auth-cookie', secretData, { sameSite: 'none',secure:true });
    return { msg: 'success' };
  }
}
