import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { query } from 'express';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto) {
    if(!createUserDto.username) return { success: false, res_desc: 'Please Input Username'}
    else if(!createUserDto.password) return { success: false, res_desc: 'Please Input Password'}
    else if(!createUserDto.role) return { success: false, res_desc: 'Please Input Role'}
    const user = await this.usersService.create(createUserDto);
    return {
      success: true,
      res_desc: 'Created User Successful',
      user
    };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query() query: string) {
    const users = await this.usersService.findAll(query);
    return {
      success: true,
      res_desc: '',
      users
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    return {
      success: true,
      res_desc: '',
      user: {
        id: user.id,
        username: user.username,
        password: user.password,
        role: user.map_user_role.map((role) => {
          return role.role_id
        })
      }
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto) {
    await this.usersService.update(+id, updateUserDto);
    return {
      success: true,
      res_desc: 'Updated Successful'
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);
    return {
      success: true,
      res_desc: 'Deleted Successful'
    };
  }
}
