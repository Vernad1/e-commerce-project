import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { CreateOrderStatus } from './dto/create-order-status.dto';

@Controller('order-status')
export class OrderStatusController {
  constructor(private orderStatusService: OrderStatusService) {}

  @Post()
  create(@Body() createOrderStatus: CreateOrderStatus) {
    return this.orderStatusService.createOrderStatus(createOrderStatus);
  }

  @Get()
  getAll() {
    return this.orderStatusService.getAll();
  }
}
