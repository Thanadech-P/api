import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import * as dayjs from 'dayjs'
@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) { }

  async create(createPurchaseDto, product) {
    try {
      const type = createPurchaseDto.type
      createPurchaseDto.car_weight = type === 'OUT' ? createPurchaseDto.car_weight_out - createPurchaseDto.car_weight_in : createPurchaseDto.car_weight_in - createPurchaseDto.car_weight_out
      const p = await this.prisma.stocks.findFirst({ where: { id: product.id } })
      if (!p) throw new BadRequestException('ไม่พบสินค้า');
      const field_no = await this.prisma.purchase.findFirst({ where: { field_no: createPurchaseDto.field_no } })
      if (field_no) throw new BadRequestException(`หมายเลข ${createPurchaseDto.field_no} มีอยู่ในระบบแล้ว`);
      const amountStock = p.amount
      const amountPuchase = product.product_amount

      if (type === 'OUT' && amountStock < amountPuchase) throw new BadRequestException('คลังสินค้าไม่เพียงพอ');
      await this.prisma.stocks.update({
        where: {
          id: product.id
        },
        data: {
          amount: createPurchaseDto.type === 'IN' ? (amountStock + amountPuchase) : (amountStock - amountPuchase)
        }
      })
      return await this.prisma.purchase.create({ data: createPurchaseDto })
    } catch (err) {
      throw (err)
    }
  }

  async findAll(query) {
    const {
      limit,
      offset,
      field_no,
      parthner_type,
      service_date,
      product_name,
      type
    } = query
    const q = {
      take: Number(limit) || 10,
      skip: Number(offset) || 0
    }
    const purchases = await this.prisma.purchase.findMany({
      orderBy: {
        created_at: 'desc'
      },
      where: {
        field_no: {
          contains:
            field_no
        },
        partner_type: {
          contains: parthner_type
        },
        service_date: {
          gte: service_date ? dayjs(service_date).format() : undefined,
          lte: service_date ? dayjs(service_date).add(1, 'day').format() : undefined,
        },
        product_name: {
          contains: product_name
        },
        type: type
      }
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

  async findOne(id: string) {
    const purcahse = await this.prisma.purchase.findFirst({
      where: {
        field_no: id
      }
    })
    if (!purcahse) throw new BadRequestException('ไม่พบข้อมูลการสั่งซื้อดังกล่าว');
    return purcahse
  }

  async summaryPuchase(date, type) {
    const q: any = {  //ไม้
      where: {
        type,
        product_name: {
          contains: 'ไม้',
          mode: 'insensitive',
        }
      },
      _sum: {
        product_net_amount: true,
        product_amount: true,
      },
    }
    const q2: any = {  //ข้าว
      where: {
        type,
        OR: [
          {
            product_name: {
              contains: 'ข้าว',
              mode: 'insensitive',
            },
          },
          {
            product_name: {
              contains: 'เหนียว',
              mode: 'insensitive',
            },
          },
        ],

      },
      _sum: {
        product_net_amount: true,
        product_amount: true,
      },
    }
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);

      q.where.created_at = {
        gt: startOfDay.toISOString(),
        lt: endOfDay.toISOString()
      }
      const wood = await this.prisma.purchase.aggregate(q)
      const rice = await this.prisma.purchase.aggregate(q2)
      return { wood, rice }
    } else {
      const wood = await this.prisma.purchase.aggregate(q)
      const rice = await this.prisma.purchase.aggregate(q2)
      return { wood, rice }
    }
  }

  update(id: number, updatePurchaseDto) {
    return this.prisma.purchase.update({ where: { id }, data: updatePurchaseDto })
  }

  remove(id: number) {
    return this.prisma.purchase.delete({ where: { id } })
  }
}
