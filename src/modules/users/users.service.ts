import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import bcrypt = require('bcrypt');


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto) {
    const findUser = await this.prisma.users.findFirst({ where: { username: createUserDto.username } })
    if (findUser) return 'Duplicate User !!'
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

  findAll(query) {
    const { limit, offset } = query
    const q = {
      where: {},
      take: Number(limit) || 10,
      skip: Number(offset) || 0
    }

    return this.prisma.users.findMany(q)
  }

  findOne(id: number) {
    return this.prisma.users.findFirst({
      where: {
        id
      },
      include: {
        map_user_role: {
          select: {
            role_id: true
          }
        }
      }
    })
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
    await this.prisma.users.update({ where: { id }, data: updateUserDto })
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
