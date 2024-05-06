import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

//TODO сделать product_image

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  // @Get()
  // getByBrand(@Query("brand") brand: string) {
  //   console.log(params);
  //   return this.productService.getProductByBrand(params.brand);
  // }

  @Get()
  getFilteredProducts(@Query() params: any) {
    return this.productService.getFilteredProducts(params);
  }

  @Get('/:id')
  getProductById(@Param('id') id: number) {
    console.log({ id });
    return this.productService.getProductById(id);
  }

  // @Get()
  // getAll() {
  //   return this.productService.getAllProduct();
  // }
}
