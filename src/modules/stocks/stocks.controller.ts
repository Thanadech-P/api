import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) { }

  @Post()
  async create(@Body() createStockDto) {
    createStockDto.amount = parseFloat(createStockDto.amount)
    createStockDto.price = parseFloat(createStockDto.price)

    const stock = await this.stocksService.create(createStockDto);
    return {
      msg: 'Created Stock Successful',
      stock
    };
  }

  @Get()
  async findAll(@Query() query: string) {
    const stocks = await this.stocksService.findAll(query);
    return {
      msg: 'Get All Stocks',
      stocks
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const stock = await this.stocksService.findOne(+id);
    return {
      msg: 'Get Stock ID',
      stock
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStockDto) {
    const stock = await this.stocksService.update(+id, updateStockDto);
    return {
      msg: 'Updated Stock',
      stock
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.stocksService.remove(+id);
    return {
      msg: 'Deleted Stock'
    };
  }
}
