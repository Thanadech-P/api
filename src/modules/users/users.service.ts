import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
export type User = any;


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: 'test',
  //     password: '1234',
  //     role: ['PURCHASE']
  //   },
  //   {
  //     userId: 2,
  //     username: 'admin',
  //     password: '1122',
  //     role: ['ADMIN', 'ACCOUNGTING']
  //   },
  // ];

  async create(createUserDto) {
    const findUser = await this.prisma.users.findFirst({ where: { username: createUserDto.username } })
    if (findUser) return 'Duplicate User !!'
    const user = await this.prisma.users.create({
      data: {
        username: createUserDto.username,
        password: createUserDto.password
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
    // return this.users.find(user => user.username === username);
    return this.prisma.users.findFirst({ where: { username } })
      .then((user) => {
        return user
      })
      .catch((err) => {
        console.log('--- Not Found User ---')
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
