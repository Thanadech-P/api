import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import bcrypt = require('bcrypt');


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto) {
    const findUser = await this.prisma.users.findFirst({ where: { username: createUserDto.username } })
    if (findUser) throw new BadRequestException('ผู้ใช้งานนี้มีอยู่ในระบบแล้ว')
    const user = await this.prisma.users.create({
      data: {
        username: createUserDto.username,
        password: bcrypt.hashSync(createUserDto.password, bcrypt.genSaltSync()),
      }
    })
    const roles = await createUserDto.role.map(async (role) => {
      await this.prisma.map_user_role.create({
        data: {
          user_id: user.id,
          role_id: role
        }
      })
    })

    return user
  }

  async findAll(query) {
    const { limit, offset } = query
    const q = {
      where: {},
      take: Number(limit) || 10,
      skip: Number(offset) || 0
    }

    const users = await this.prisma.users.findMany(q)
    if (!users) throw new BadRequestException('ไม่พบผู้ใช้งานในระบบ')
    return users
  }

  async findOne(id: number) {
    const user = await this.prisma.users.findFirst({
      where: {
        id
      },
      include: {
        map_user_role: {
          select: {
            roles: true
          }
        }
      }
    })
    if (!user) throw new BadRequestException('ไม่พบข้อมูลผู้ใช้งานดังกล่าว')
    return user
  }

  async findOneUsername(username: string) {
    return this.prisma.users.findFirst({ where: { username } })
      .then((user) => {
        return user
      })
      .catch((err) => {
        return null
      })
  }

  async update(id: number, updateUserDto) {
    const role = updateUserDto.role
    const updateUser: any = {}
    if (updateUserDto.password) {
      updateUser.password = bcrypt.hashSync(updateUserDto.password, bcrypt.genSaltSync())
      await this.prisma.users.update({ where: { id }, data: updateUserDto })
    }
    if (role && role.length > 0) {
      console.log('--- delete role ---')
      await this.prisma.map_user_role.deleteMany({
        where: {
          user_id: id
        }
      })
      await role.map(async (r) => {
        await this.prisma.map_user_role.create({
          data: {
            user_id: id,
            role_id: r
          }
        })
      })
    }
    return true
  }

  async remove(id: number) {
    await this.prisma.users.delete({ where: { id } })
    await this.prisma.map_user_role.deleteMany({
      where: {
        user_id: id
      }
    })
    return true
  }
}
