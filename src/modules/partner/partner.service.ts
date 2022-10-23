import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class PartnerService {
  constructor(private prisma: PrismaService) { }

  create(createPartnerDto) {
    return this.prisma.partner.create(createPartnerDto)
  }

  findAll() {
    return this.prisma.partner.findMany()
  }

  findOne(id: number) {
    return this.prisma.partner.findUnique({ where: { id } })
  }

  update(id: number, updatePartnerDto) {
    return this.prisma.partner.update({ where: { id }, data: updatePartnerDto })
  }

  remove(id: number) {
    return this.prisma.partner.delete({ where: { id } })
  }
}
