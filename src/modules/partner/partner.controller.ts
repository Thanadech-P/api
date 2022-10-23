import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PartnerService } from './partner.service';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  async create(@Body() createPartnerDto) {
    const partner = await this.partnerService.create(createPartnerDto);
    return {
      success: true,
      res_desc: '',
      partner
    };
  }

  @Get()
  async findAll() {
    const partner = await this.partnerService.findAll();
    return {
      success: true,
      res_desc: '',
      partner
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const partner = await this.partnerService.findOne(+id);
    return {
      success: true,
      res_desc: '',
      partner
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePartnerDto) {
    await this.partnerService.update(+id, updatePartnerDto);
    return {
      success: true,
      res_desc: ''
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.partnerService.remove(+id);
    return {
      success: true,
      res_desc: ''
    };
  }
}
