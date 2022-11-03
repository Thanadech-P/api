import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class StocksService {
  constructor(private prisma: PrismaService) { }

  create(createStockDto) {
    return this.prisma.stocks.create({ data: createStockDto })
  }

  async findAll(query) {
    const { limit, offset, date} = query
    const q = {
      where:{
        created_at: date
      },
      take: Number(limit) || 10,
      skip: Number(offset) || 0
    }
    const stocks = await this.prisma.stocks.findMany(q)
    if(!stocks) throw new BadRequestException('ไม่พบข้อมูลสินค้าในระบบ')
    return stocks
  }

  async findOne(id: number) {
    const stock = await this.prisma.stocks.findUnique({ where: { id }})
    if(!stock) throw new BadRequestException('ไม่พบข้อมูลสินค้าดังกล่าว')
    return stock
  }

  update(id: number, updateStockDto) {
    return this.prisma.stocks.update({ where: { id }, data: updateStockDto })
  }

  remove(id: number) {
    return this.prisma.stocks.delete({ where: { id }})
  }
}
