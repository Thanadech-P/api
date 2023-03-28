import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { StocksparelogService } from './stocksparelog.service';
import { UpdateStocksparelogDto } from './dto/update-stocksparelog.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('stock-spare-log')
export class StocksparelogController {
  constructor(private readonly stocksparelogService: StocksparelogService, private jwtService: JwtService) { }

  @Post()
  create(@Req() req: any,
    @Body() createStocksparelogDto: any,) {
    // const data: any = this.jwtService.decode(req.cookies['auth-cookie'].token)
    return this.stocksparelogService.create(createStocksparelogDto.payload);
  }

  @Get()
  findAll() {
    return this.stocksparelogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stocksparelogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStocksparelogDto: UpdateStocksparelogDto) {
    return this.stocksparelogService.update(+id, updateStocksparelogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stocksparelogService.remove(+id);
  }
}
