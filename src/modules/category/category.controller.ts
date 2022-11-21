import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    return {
      msg: 'Create Category Successful',
      category
    }
  }

  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return {
      msg: 'Get All Categories',
      categories
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(+id);
    return {
      msg: 'Get Category ID',
      category
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto) {
    await this.categoryService.update(+id, updateCategoryDto);
    return {
      msg: 'Update Category Successful'
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(+id);
    return {
      msg: 'Delete Category Successful'
    }
  }
}
