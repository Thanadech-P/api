import { Body, HttpStatus, Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma.service';
import { UpdateStocksparelogDto } from './dto/update-stocksparelog.dto';

@Injectable()
export class StocksparelogService {
  constructor(private prisma: PrismaService,
  ) { }

  async create(data: any) {
    data.amount = parseInt(data.amount)
    const new_part_amount = data.type === 'EXPORT' ? parseInt(data.old_amount) - parseInt(data.amount) : parseInt(data.old_amount) + parseInt(data.amount)
    delete data['old_amount']
    await this.prisma.$transaction([
      this.prisma.stockspare.update({
        data: {
          amount: new_part_amount
        },
        where: {
          id: data.stockspare_id
        }
      }),
      this.prisma.stockspare_log.create({
        data: data
      })
    ])
    return HttpStatus.CREATED
  }

  async findAll() {
    return await this.prisma.stockspare_log.findMany({
      orderBy: {
        created_at: 'desc'
      },
      include: {
        stockspare: true,
        users: true
      },

    })
  }

  findOne(id: number) {
    return `This action returns a #${id} stocksparelog`;
  }

  update(id: number, updateStocksparelogDto: UpdateStocksparelogDto) {
    return `This action updates a #${id} stocksparelog`;
  }

  remove(id: number) {
    return `This action removes a #${id} stocksparelog`;
  }
}
