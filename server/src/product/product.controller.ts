import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

//TODO сделать product_image

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createProductDto: CreateProductDto, @UploadedFile() image) {
    return this.productService.createProduct(createProductDto, image);
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
