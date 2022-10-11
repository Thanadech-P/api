import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class StocksService {
  constructor(private prisma: PrismaService) { }

  create(createStockDto) {
    return this.prisma.stocks.create({ data: createStockDto })
  }

  findAll(query) {
    const { limit, offset, date} = query
    const q = {
      where:{
        created_at: date
      },
      take: Number(limit) || 10,
      skip: Number(offset) || 0
    }
    return this.prisma.stocks.findMany(q)
  }

  findOne(id: number) {
    return this.prisma.stocks.findUnique({ where: { id }})
  }

  update(id: number, updateStockDto) {
    return this.prisma.stocks.update({ where: { id }, data: updateStockDto })
  }

  remove(id: number) {
    return this.prisma.stocks.delete({ where: { id }})
  }
}
