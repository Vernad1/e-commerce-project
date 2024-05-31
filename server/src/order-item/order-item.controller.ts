import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderItem } from './dto/create-order-item.dto';
import { OrderItemService } from './order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Post()
  create(@Body() orderItemDto: CreateOrderItem) {
    return this.orderItemService.createOrderItem(orderItemDto);
  }

  @Get()
  getAll() {
    return this.orderItemService.getAll();
  }
}
