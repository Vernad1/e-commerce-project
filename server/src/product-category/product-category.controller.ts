import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';

@Controller('product-category')
export class ProductCategoryController {
  constructor(private productCategoryService: ProductCategoryService) {}
  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.createProductCategory(
      createProductCategoryDto,
    );
  }

  @Get()
  getAll() {
    return this.productCategoryService.getAllProductCategory();
  }
}
