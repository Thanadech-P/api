import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) { }

  async create(createVehicleDto) {
    const vehicle = await this.prisma.vehicle.create(createVehicleDto)
    return vehicle;
  }

  async findAll() {
    const vehicles = await this.prisma.vehicle.findMany()
    return vehicles;
  }

  async findOne(id: number) {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id }})
    return vehicle;
  }

  async update(id: number, updateVehicleDto) {
    const update = await this.prisma.vehicle.update({ where: { id }, data: updateVehicleDto})
    return update;
  }

  async remove(id: number) {
    await this.prisma.vehicle.delete({ where: { id } })
  }
}
