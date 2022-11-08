import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) { }

  async create(createPurchaseDto, product) {
    const type = createPurchaseDto.type
    const p = await this.prisma.stocks.findFirst({ where: { id: product.id } })
    if (!p) throw new BadRequestException('ไม่พบสินค้า');
    const amountStock = p.amount
    const amountPuchase = product.product_amount
    if (type === 'OUT' && amountStock < amountPuchase) throw new BadRequestException('คลังสินค้าไม่เพียง');
    await this.prisma.stocks.update({
      where: {
        id: product.id
      },
      data: {
        amount: createPurchaseDto.type === 'IN' ? (amountStock + amountPuchase) : (amountStock - amountPuchase)
      }
    })
    return await this.prisma.purchase.create({ data: createPurchaseDto })
  }

  async findAll(query) {
    const { limit, offset, date } = query
    const q = {
      take: Number(limit) || 10,
      skip: Number(offset) || 0
    }
    const purchases = await this.prisma.purchase.findMany({
      orderBy: {
        created_at: 'desc'
      },
      ...q
    })
    if (!purchases) throw new BadRequestException('ไม่พบข้อมูลการสั่งซื้อในระบบ');

    return purchases
  }

  async findListnameDelivery() {
    const delivery = await this.prisma.purchase.findMany({
      select: {
        delivery_man: true
      },
      distinct: ['delivery_man'],
    })
    if (!delivery) throw new BadRequestException('ไม่มีรายชื่อผู้ส่งสินค้า');

    return delivery
  }

  async findListnameRecipient() {
    const recipient = await this.prisma.purchase.findMany({
      select: {
        recipient: true
      },
      distinct: ['recipient'],
    })
    if (!recipient) throw new BadRequestException('ไม่มีรายชื่อผู้รับสินค้า');

    return recipient
  }

  async findOne(id: number) {
    const purcahse = await this.prisma.purchase.findUnique({ where: { id } })
    if(!purcahse) throw new BadRequestException('ไม่พบข้อมูลการสั่งซื้อดังกล่าว');
    return purcahse
  }

  async summaryOfDay(query) {
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
