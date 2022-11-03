import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class PartnerService {
  constructor(private prisma: PrismaService) { }

  async create(createPartnerDto) {
    const partner = await this.prisma.partner.create(createPartnerDto)
    if (!partner) throw new BadRequestException('ไม่สามารถพาร์ทเนอร์ได้ กรุณาลองใหม่อีกครั้ง')
    return partner
  }

  async findAll() {
    const partners = await this.prisma.partner.findMany()
    if (!partners) throw new BadRequestException('ไม่มีพาร์ทเนอร์ในระบบ')
    return partners
  }

  async findOne(id: number) {
    const partner = await this.prisma.partner.findUnique({ where: { id } })
    if (!partner) throw new BadRequestException('ไม่พบข้อมูลพาร์ทเนอร์ดังกล่าว')
    return partner
  }

  update(id: number, updatePartnerDto) {
    return this.prisma.partner.update({ where: { id }, data: updatePartnerDto })
  }

  remove(id: number) {
    return this.prisma.partner.delete({ where: { id } })
  }
}
