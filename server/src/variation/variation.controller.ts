import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VariationService } from './variation.service';
import { CreateVariationDto } from './dto/create-variation.dto';

@Controller('variation')
export class VariationController {
  constructor(private variationService: VariationService) {}
  @Post()
  create(@Body() createProductCategoryDto: CreateVariationDto) {
    return this.variationService.createVariation(createProductCategoryDto);
  }

  @Get()
  getAll() {
    return this.variationService.getAllVariation();
  }

  @Get('/:name')
  getVariationByName(@Param('name') name: string) {
    return this.variationService.getVariationByName(name);
  }
}
