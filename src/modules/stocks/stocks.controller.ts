import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) { }

  @Post()
  async create(@Body() createStockDto) {
    const stock = await this.stocksService.create(createStockDto);
    return {
      res_desc: 'Created Stock Successful',
      stock
    };
  }

  @Get()
  async findAll(@Query() query: string) {
    const stocks = await this.stocksService.findAll(query);
    return {
      res_desc: 'Get All Stocks',
      stocks
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const stock = await this.stocksService.findOne(+id);
    return {
      res_desc: 'Get Stock ID',
      stock
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStockDto) {
    const stock = await this.stocksService.update(+id, updateStockDto);
    return {
      res_desc: 'Updated Stock',
      stock
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.stocksService.remove(+id);
    return {
      res_desc: 'Deleted Stock'
    };
  }
}
