import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PurchaseService } from './purchase.service';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async create(@Body() createPurchaseDto) {
    const purchase = await this.purchaseService.create(createPurchaseDto);
    return {
      success: true,
      res_desc: 'Purchase Successful',
      purchase
    };
  }

  @Get()
  async findAll(@Query() query: string) {
    const purchases = await this.purchaseService.findAll(query);
    return {
      success: true,
      res_desc: '',
      purchases
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const purchase = await this.purchaseService.findOne(+id);
    return {
      success: true,
      res_desc: '',
      purchase
    };

  }
  @Get('summary/day')
  async summaryOfDay(@Query() query: string) {
    const summary = await this.purchaseService.summaryOfDay(query);
    return {
      success: true,
      res_desc: '',
      summary: {
        total: summary._sum.total || 0,
        amount: summary._sum.amount || 0
      }
    };
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePurchaseDto) {
  //   return this.purchaseService.update(+id, updatePurchaseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.purchaseService.remove(+id);
  // }
}
