import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Query, Req, BadRequestException } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService,
    private readonly jwtService: JwtService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Req() req: any,
    @Body() createPurchaseDto) {
    const data: any = this.jwtService.decode(req.cookies['auth-cookie'].token)
    if(!createPurchaseDto.type) throw new BadRequestException('ไม่พบ Request body "TYPE"')
    if(!createPurchaseDto.product_id) throw new BadRequestException('ไม่พบ Request body "PRODUCT_ID"')
    const newPurchase = {
      user_id: data.id,
      branch_id: data.branch_id,
      date_in: createPurchaseDto.time_in,
      date_out: createPurchaseDto.time_out,
      type: createPurchaseDto.type,
      partner_type: createPurchaseDto.partner,
      //product
      product_name: createPurchaseDto.product_name,
      product_amount: parseFloat(createPurchaseDto.product_amount),
      product_price_per_unit: createPurchaseDto.product_price_per_unit,
      product_net_amount: parseFloat(createPurchaseDto.product_net_amount),
      //car
      car_number: createPurchaseDto.car_number,
      car_weight_in: parseFloat(createPurchaseDto.car_weight_in),
      car_weight_out: parseFloat(createPurchaseDto.car_weight_out),
      car_weight: parseFloat(createPurchaseDto.car_weight),
      //weight
      weight: parseFloat(createPurchaseDto.weight_amount),
      subtract_weight: parseFloat(createPurchaseDto.subtract_weight),
      //optional
      weigher: createPurchaseDto.weigher,
      recipient: createPurchaseDto.recipient,
      delivery_man: createPurchaseDto.deliver_man,
      note: createPurchaseDto.note
    }
    const product = {
      id: createPurchaseDto.product_id,
      product_name: createPurchaseDto.product_name,
      product_amount: parseFloat(createPurchaseDto.product_amount),
      product_price_per_unit: createPurchaseDto.product_price_per_unit,
      product_net_amount: parseFloat(createPurchaseDto.product_net_amount)
    }
    const purchase = await this.purchaseService.create(newPurchase, product);
    return {
      msg: 'Purchase Successful',
      purchase
    };
  }

  @Get()
  async findAll(@Query() query: string) {
    const purchases = await this.purchaseService.findAll(query);
    return {
      msg: 'Get Purchases',
      purchases
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const purchase = await this.purchaseService.findOne(+id);
    return {
      msg: 'Get Purcase ID',
      purchase
    };

  }

  @Get('/listname/delivery')
  async findListnameDelivery() {
    const listnames = await this.purchaseService.findListnameDelivery();
    return {
      msg: 'Get Listname Delivery',
      listnames
    };
  }

  @Get('/listname/recipient')
  async findListnameRecipient() {
    const listnames = await this.purchaseService.findListnameRecipient();
    return {
      msg: 'Get Listname Recipient',
      listnames
    };
  }

  @Get('summary/day')
  async summaryOfDay(@Query() query: string) {
    const summary = await this.purchaseService.summaryOfDay(query);
    // return {
    //   success: true,
    //   msg: '',
    //   summary: {
    //     total: summary._sum.total || 0,
    //     amount: summary._sum.amount || 0
    //   }
    // };
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
