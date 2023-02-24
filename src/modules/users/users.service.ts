import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import bcrypt = require('bcrypt');
@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async create(createUserDto) {
    const findUser = await this.prisma.users.findFirst({ where: { username: createUserDto.username } })
    if (findUser) throw new BadRequestException('ผู้ใช้งานนี้มีอยู่ในระบบแล้ว')
    const createUser = await this.prisma.users.create({
      data: {
        username: createUserDto.username,
        password: bcrypt.hashSync(createUserDto.password, bcrypt.genSaltSync()),
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
      }
    })
    await Promise.all(createUserDto.role.map(async (role: any) => {
      await this.prisma.map_user_role.create({
        data: {
          user_id: createUser.id,
          role_id: role
        }
      })
    }))

    return createUser
  }

  async findAll(query) {
    const { limit, offset, username, first_name, last_name } = query
    const q = {
      where: {
        username: { contains: username ?? undefined },
        first_name: { contains: first_name ?? undefined },
        last_name: { contains: last_name ?? undefined },
      },
      take: Number(limit) || 10,
      skip: Number(offset) || 0,
      include: {
        map_user_role: {
          select: {
            roles: true,
          }
        },
        map_user_branch: {
          select: {
            branchs: true,
          }
        }
      }
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
    return await this.prisma.users.delete({ where: { id } })
  }

  async getRole() {
    const result = this.prisma.roles.findMany()
    return result;
  }

  async getBranchs() {
    try {
      const result = this.prisma.branchs.findMany()
      return result;

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
