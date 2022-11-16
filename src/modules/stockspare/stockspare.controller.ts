import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { StockspareService } from './stockspare.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { createStockspareDtoValidate } from './validation/createStockspare'

@Controller('stockspare')
export class StockspareController {
  constructor(private readonly stockspareService: StockspareService,
    private readonly jwtService: JwtService) { }  

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Req() req: any,
  @Body() createStockspareDto: createStockspareDtoValidate) {
    const data: any = this.jwtService.decode(req.cookies['auth-cookie'].token)
    const newStockspare = {
      user_id: data.id,
      name: createStockspareDto.name,
      amount: parseFloat(createStockspareDto.amount),
      price_in: parseFloat(createStockspareDto.price_in),
      price_out: parseFloat(createStockspareDto.price_out),
      stock: parseFloat(createStockspareDto.stock),
      profit: parseFloat(createStockspareDto.profit)
    }
    console.log(newStockspare)
    const stockspare = await this.stockspareService.create(newStockspare);
    return {
      msg: '',
      stockspare
    }
  }

  @Get()
  async findAll() {
    const stockspare = await this.stockspareService.findAll();
    return{
      msg: 'Get All Stockspare',
      stockspare
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const stockspare = await this.stockspareService.findOne(+id);
    return{
      msg: 'Get Stockspare ID',
      stockspare
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string,@Req() req: any, @Body() updateStockspareDto) {
    const data: any = this.jwtService.decode(req.cookies['auth-cookie'].token)
    const userId = data.id
    await this.stockspareService.update(+id, updateStockspareDto, userId);
    return {
      msg: 'Update Stockspare Successful'
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockspareService.remove(+id);
  }
}
