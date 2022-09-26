import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  create(createUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
