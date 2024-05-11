import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { CreateProductItemDto } from './dto/create-product-item.dto';

@Controller('product-item')
export class ProductItemController {
  constructor(private productItemService: ProductItemService) {}
  @Post()
  create(@Body() createProductDto: CreateProductItemDto) {
    return this.productItemService.createProductItem(createProductDto);
  }

  @Get()
  getAll() {
    return this.productItemService.getAllProductItem();
  }

  @Get('/sizes/:id')
  getSizesByProduct(@Param('id') id: number) {
    return this.productItemService.getSizeByProductId(id);
  }
}
