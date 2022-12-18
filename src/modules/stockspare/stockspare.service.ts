import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class StockspareService {
  constructor(private prisma: PrismaService) { }

  async create(createStockspareDto) {
    return await this.prisma.stockspare.create({ data: createStockspareDto });
  }

  async findAll() {
    return await this.prisma.stockspare.findMany();
  }

  async findOne(id: number) {
    const stockspare = await this.prisma.stockspare.findUnique({
      where: {
        id
      },
      include: {
        stockspare_log: true
      }
    });
    return stockspare
  }

  async summaryStockspare(id: number, type: string) {
    const q: any = {
      where: {
        type,
        stockspare_id: id
      },
      _sum: {
        amount: true
      },
    }
    const sum = await this.prisma.stockspare_log.aggregate(q);
    return sum._sum.amount
  }

  async update(id: number, updateStockspareDto, userId) {
    const type = updateStockspareDto.type
    const updateStockspare: any = {}
    if (updateStockspareDto.name) updateStockspare.name = updateStockspareDto.name
    if (updateStockspareDto.amount) updateStockspare.amount = parseFloat(updateStockspareDto.amount)
    if (updateStockspareDto.price_in) updateStockspare.price_in = parseFloat(updateStockspareDto.price_in)
    if (updateStockspareDto.price_out) updateStockspare.price_out = parseFloat(updateStockspareDto.price_out)
    if (updateStockspareDto.stock) updateStockspare.stock = parseFloat(updateStockspareDto.stock)
    if (updateStockspareDto.profit) updateStockspare.profit = parseFloat(updateStockspareDto.profit)
    const stockspare = await this.prisma.stockspare.findUnique({ where: { id } })
    if (!stockspare) throw new BadRequestException('ไม่พบอะไหล่ดังกล่าว')
    if (type) {
      if (type === 'IMPORT') {
        const amountOld = stockspare.amount
        const amountImport = updateStockspareDto.import ? parseFloat(updateStockspareDto.import) : null
        if (!amountImport) throw new BadRequestException('กรุณาส่งข้อมูลที่ต้องการ import')
        const newAmount = amountOld + amountImport

        const updateImport = {
          amount: newAmount,
          updated_at: new Date()
        }
        await this.prisma.stockspare.update({ where: { id }, data: updateImport })

        //สร้าง log ผู้ดำเนินการ
        const createLog = {
          type,
          user_id: userId,
          stockspare_id: stockspare.id,
          amount: amountImport
        }
        await this.prisma.stockspare_log.create({ data: createLog })

      } else if (type === 'EXPORT') {
        const amountOld = stockspare.amount
        const amountExport = updateStockspareDto.export ? parseFloat(updateStockspareDto.export) : null
        if (!amountExport) throw new BadRequestException('กรุณาส่งข้อมูลที่ต้องการ export')
        const newAmount = amountOld - amountExport
        if (newAmount < 0) throw new BadRequestException('อะไหล่ไม่เพียงพอต่อการ export')

        const updateExport = {
          amount: newAmount,
          updated_at: new Date()
        }
        await this.prisma.stockspare.update({ where: { id }, data: updateExport })

        //สร้าง log ผู้ดำเนินการ
        const createLog = {
          type,
          user_id: userId,
          stockspare_id: stockspare.id,
          amount: amountExport
        }
        await this.prisma.stockspare_log.create({ data: createLog })
      } else {
        throw new BadRequestException('type ไม่ถูกต้องกรุณาตรวจสอบ (IMPORT or EXPORT)')
      }
    }
    else {
      ('--- update Stocksapre ---')
      return this.prisma.stockspare.update({ where: { id }, data: updateStockspare});
    }
  }

  remove(id: number) {
    return `This action removes a #${id} stockspare`;
  }
}
