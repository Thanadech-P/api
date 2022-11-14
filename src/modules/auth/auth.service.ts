import { HttpException, HttpStatus, Injectable, Res, Req, Get, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as randomToken from 'rand-token';
import * as dayjs from 'dayjs';
import { PrismaService } from 'prisma.service';
import { Prisma } from '.prisma/client';
import bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) { }

  async validateUser(
    username: string, pass: string,
  ) {
    const user: any = await this.prisma.users.findFirst({
      where: {
        username
      }
    });
    if (user && user.password === pass) {
      const payload = { username: user.username, sub: user.id };
      const access_token = this.jwtService.signAsync(payload);
      return {
        token: access_token,
        refreshToken: '',
      };
    }
    throw new HttpException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!!', HttpStatus.BAD_REQUEST);
  }

  async getJwtToken(user: any): Promise<string> {
    const payload = {
      ...user,
    };
    const result = await this.jwtService.signAsync(payload);
    return result;
  }

  async getRefreshToken(userId: number): Promise<any> {
    const userDataToUpdate = {
      refresh_token: randomToken.generate(16),
      refresh_token_exp: dayjs().add(1, 'day').format()
    };

    await this.prisma.users.update({
      data: userDataToUpdate,
      where: {
        id: userId
      }
    });
    return userDataToUpdate.refresh_token;
  }

  async validRefreshToken(
    id: number,
    refreshToken: string,
  ): Promise<any> {
    const currentDate = dayjs().add(1, 'day').format();
    let user = await this.prisma.users.findFirst({
      where: {
        id: id,
        refresh_token: refreshToken,
        refresh_token_exp: {
          gte: currentDate
        }
      },
      include: {
        map_user_branch: {
          select: {
            branchs: true
          }
        }
      }
    });
    if (!user) {
      return null;
    }
    const currentUser = {
      id: user.id,
      username: user.username,
      branch_id: user?.map_user_branch[0]?.branchs?.id || null,
    }
    return currentUser;
  }

  async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<any> {
    let user = await this.prisma.users.findFirst({
      where: {
        username: username
      },
      include: {
        map_user_branch: {
          select: {
            branchs: true
          }
        }
      }
    });

    if (user == null) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    // const isValidPassword = password === user.password

    if (!isValidPassword) {
      return null;
    }
    const userData = {
      id: user.id,
      branch_id: user?.map_user_branch[0]?.branchs?.id || null,
      username: user?.username,
    }
    return userData;
  }

}
