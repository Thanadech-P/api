import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) { }

  create(createPurchaseDto) {
    return this.prisma.purchase.create({ data: createPurchaseDto })
  }

  findAll(query) {
    const { limit, offset} = query
    const q = {
      where:{},
      take: Number(limit) || 10,
      skip: Number(offset) || 0
    }
    return this.prisma.purchase.findMany(q)
  }

  findOne(id: number) {
    return this.prisma.purchase.findUnique({ where: { id } })
  }

  update(id: number, updatePurchaseDto) {
    return this.prisma.purchase.update({ where: { id }, data: updatePurchaseDto })
  }

  remove(id: number) {
    return this.prisma.purchase.delete({ where: { id } })
  }
}
