import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { createVehicleDtoValidate } from './validation/createVehicle';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  create(@Body() createVehicleDto: createVehicleDtoValidate) {
    const vehicle = this.vehicleService.create(createVehicleDto);
    return {
      msg: 'Created Vehicle Successful',
      vehicle
    };
  }

  @Get()
  findAll() {
    const vehicles = this.vehicleService.findAll();
    return {
      msg: 'Get All Vehicle',
      vehicles
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const vehicle = this.vehicleService.findOne(+id);
    return {
      msg: 'Get Vehicle ID',
      vehicle
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto) {
    return this.vehicleService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(+id);
  }
}
