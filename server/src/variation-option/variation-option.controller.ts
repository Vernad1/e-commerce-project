import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VariationOptionService } from './variation-option.service';
import { CreateVariationOptionDto } from './dto/create-variation-option.dto';

@Controller('variation-option')
export class VariationOptionController {
  constructor(private variationOptionService: VariationOptionService) {}
  @Post()
  create(@Body() createVariationOptionDto: CreateVariationOptionDto) {
    return this.variationOptionService.createVariationOption(
      createVariationOptionDto,
    );
  }

  @Get()
  getAll() {
    return this.variationOptionService.getAllVariationOption();
  }

  @Get('/:option')
  getVariationByName(@Param('option') value: string) {
    return this.variationOptionService.getVariationByValue(value);
  }
}
