import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PartnerService } from './partner.service';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  async create(@Body() createPartnerDto) {
    const partner = await this.partnerService.create(createPartnerDto);
    return {
      msg: 'Create Partner Successfull',
      partner
    };
  }

  @Get()
  async findAll() {
    const partner = await this.partnerService.findAll();
    return {
      msg: 'Get All Partner',
      partner
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const partner = await this.partnerService.findOne(+id);
    return {
      msg: 'Get Partner ID',
      partner
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePartnerDto) {
    await this.partnerService.update(+id, updatePartnerDto);
    return {
      msg: 'Updated Partner'
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.partnerService.remove(+id);
    return {
      msg: 'Delete Partner'
    };
  }
}
