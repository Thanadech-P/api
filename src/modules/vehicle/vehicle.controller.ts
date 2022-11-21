import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { createVehicleDtoValidate } from './validation/createVehicle';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async create(@Body() createVehicleDto: createVehicleDtoValidate) {
    const vehicle = await this.vehicleService.create(createVehicleDto);
    return {
      msg: 'Created Vehicle Successful',
      vehicle
    };
  }

  @Get()
  async findAll() {
    const vehicles = await this.vehicleService.findAll();
    return {
      msg: 'Get All Vehicle',
      vehicles
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const vehicle = await this.vehicleService.findOne(+id);
    return {
      msg: 'Get Vehicle ID',
      vehicle
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVehicleDto) {
    return await this.vehicleService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.vehicleService.remove(+id);
  }
}
