import { Req } from '@nestjs/common';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { createUserDtoValidate } from './validation/createUser';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService) { }

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  async create(@Body() createUserDto: createUserDtoValidate) {
    const user = await this.usersService.create(createUserDto);
    return {
      msg: 'Created User Successful',
      user
    };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query() query: string) {
    const users = await this.usersService.findAll(query);
    return {
      msg: 'Get All Users',
      users
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    return {
      msg: 'Get User ID',
      user: {
        id: user.id,
        username: user.username,
        password: user.password,
      }
    };
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateUserDto) {
    await this.usersService.update(+id, updateUserDto);
    return {
      msg: 'Updated User Successful'
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);
    return {
      msg: 'Deleted User Successful'
    };
  }


  @Get('/get/me')
  @UseGuards(AuthGuard('jwt'))
  async getUserProfile(@Req() req: any) {
    const data: any = this.jwtService.decode(req.cookies['auth-cookie'].token)
    const result = await this.usersService.findOne(data?.id);
    const user = {
      username: result.username,
      role: result.map_user_role.map((item) => item.roles.code),
      id: result.id,
    }
    return { user };
  }

  @Get('/get/roles')
  @UseGuards(AuthGuard('jwt'))
  async getRoles() {
    const data = await this.usersService.getRole()
    return data;
  }

  @Get('/get/branchs')
  @UseGuards(AuthGuard('jwt'))
  async getBranchs() {
    const data = await this.usersService.getBranchs()
    return data;
  }


}
