import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
export type User = any;


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  private readonly users = [
    {
      userId: 1,
      username: 'test',
      password: '1234',
      role: ['PURCHASE']
    },
    {
      userId: 2,
      username: 'admin',
      password: '1122',
      role: ['ADMIN', 'ACCOUNGTING']
    },
  ];

  create(createUserDto) {
    console.log(createUserDto)
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
