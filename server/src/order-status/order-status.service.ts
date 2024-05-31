import { Injectable } from '@nestjs/common';
import { OrderStatus } from './order-status.model';
import { CreateOrderStatus } from './dto/create-order-status.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectModel(OrderStatus) private orderStatusRepository: typeof OrderStatus,
  ) {}

  async createOrderStatus(dto: CreateOrderStatus) {
    const orderStatus = await this.orderStatusRepository.create(dto);
    return orderStatus;
  }

  async getAll() {
    const orderStatus = await this.orderStatusRepository.findAll({
      include: { all: true },
    });
    return orderStatus;
  }
}
