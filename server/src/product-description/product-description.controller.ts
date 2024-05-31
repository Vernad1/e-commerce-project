import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDescription } from './dto/create-product-description';
import { ProductDescriptionService } from './product-description.service';

@Controller('description')
export class ProductDescriptionController {
  constructor(private descriptionService: ProductDescriptionService) {}

  @Post()
  createDescription(@Body() dto: CreateProductDescription) {
    return this.descriptionService.createDescription(dto);
  }

  @Get()
  getAllDescription() {
    return this.descriptionService.getAllDescription();
  }
}
