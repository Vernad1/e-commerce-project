import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateShopOrderDto } from './dto/create-shop-order.dto';
import { ShopOrderService } from './shop-order.service';

@Controller('shop-order')
export class ShopOrderController {
  constructor(private shopOrderService: ShopOrderService) {}

  @Post()
  create(@Body() createShopOrderDto: CreateShopOrderDto) {
    return this.shopOrderService.createShopOrder(createShopOrderDto);
  }

  @Get()
  getAll() {
    return this.shopOrderService.getAll();
  }
}
