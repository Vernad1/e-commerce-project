import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DetailsService } from './details.service';
import { CreateDetailDto } from './dto/create-detail.dto';
import { query } from 'express';

@Controller('details')
export class DetailsController {
  constructor(private detailsService: DetailsService) {}

  @Post()
  createDetail(@Body() dto: CreateDetailDto) {
    return this.detailsService.createDetail(dto);
  }

  @Get()
  getAll(@Query() params: any) {
    return this.detailsService.getAllDetails(params);
  }

  @Get('/brand')
  getBrands() {
    return this.detailsService.getBrands();
  }

  @Get('/color')
  getColors() {
    return this.detailsService.getColors();
  }

  @Get('find?')
  getByValue(@Query('name') name: string, @Query('value') value: string) {
    if (name && value) {
      name = name[0].toUpperCase() + name.slice(1);
      value = value[0].toUpperCase() + value.slice(1);
      return this.detailsService.getByValue({ value, name });
    } else {
      throw new HttpException(
        'Нужно ввести name и value',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
