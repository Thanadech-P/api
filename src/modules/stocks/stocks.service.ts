import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class StocksService {
  constructor(private prisma: PrismaService) { }

  create(createStockDto) {
    return this.prisma.stocks.create({ data: createStockDto })
  }

  async findAll(query) {
    const {
      product_name,
    } = query
    const stocks = await this.prisma.stocks.findMany({
      orderBy: {
        updated_at: 'desc'
      },
      where: {
        name: {
          contains: product_name
        }
      }
    })
    if (!stocks) throw new BadRequestException('ไม่พบข้อมูลสินค้าในระบบ')
    return stocks
  }

  async findOne(id: number) {
    const stock = await this.prisma.stocks.findUnique({ where: { id } })
    if (!stock) throw new BadRequestException('ไม่พบข้อมูลสินค้าดังกล่าว')
    return stock
  }

  update(id: number, updateStockDto) {
    return this.prisma.stocks.update({ where: { id }, data: updateStockDto })
  }

  remove(id: number) {
    return this.prisma.stocks.delete({ where: { id } })
  }
}
