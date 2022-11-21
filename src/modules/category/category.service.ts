import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  async create(createCategoryDto) {
    const category = await this.prisma.category.create({ data: createCategoryDto })
    return category;
  }

  async findAll() {
    const categories = await this.prisma.category.findMany()
    if(!categories) throw new BadRequestException('ไม่พบหมวดหมู่ในระบบ')
    return categories;
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id
      },
      include: {
        stocks: true
      }
    })
    if(!category) throw new BadRequestException('ไม่พบหมวดหมู่ดังกล่าว')
    return category;
  }

  async update(id: number, updateCategoryDto) {
    const updateCategory: any = {}
    if (updateCategoryDto.name) updateCategory.name = updateCategoryDto.name
    const updated = await this.prisma.category.update({ where: { id }, data: updateCategory })
    return updated;
  }

  async remove(id: number) {
    await this.prisma.category.delete({ where: { id } })
    return true;
  }
}
