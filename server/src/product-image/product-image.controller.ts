import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductImage } from './dto/create-product-image.dto';
import { ProductImageService } from './product-image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product-image')
export class ProductImageController {
  constructor(private productImageService: ProductImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createProductImage(@Body() dto: CreateProductImage, @UploadedFile() image) {
    return this.productImageService.create(dto, image);
  }

  @Get()
  getAllImage() {
    return this.productImageService.getAll();
  }
}
