import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) { }

  create(createPurchaseDto) {
    return this.prisma.purchase.create({ data: createPurchaseDto })
  }

  findAll(query) {
    const { limit, offset, date } = query
    const q = {
      where: {
        created_at: date
      },
      take: Number(limit) || 10,
      skip: Number(offset) || 0
    }
    return this.prisma.purchase.findMany(q)
  }

  findOne(id: number) {
    return this.prisma.purchase.findUnique({ where: { id } })
  }

  async summaryOfDay(query) {
    console.log(query)

    const startOfDay = new Date(query.date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(query.date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const q: any = {
      where: {
        created_at: {
          gt: startOfDay.toISOString(),
          lt: endOfDay.toISOString()
        }
      },
      _sum: {
        total: true,
        amount: true,
      },
    }
    const sum = await this.prisma.purchase.aggregate(q)
    return sum;
  }

  update(id: number, updatePurchaseDto) {
    return this.prisma.purchase.update({ where: { id }, data: updatePurchaseDto })
  }

  remove(id: number) {
    return this.prisma.purchase.delete({ where: { id } })
  }
}
