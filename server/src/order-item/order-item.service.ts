import { Injectable } from '@nestjs/common';
import { OrderItem } from './order-item.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderItem } from './dto/create-order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectModel(OrderItem) private addressRepository: typeof OrderItem,
  ) {}

  //TODO удаление из корзины и уменьшение кол-ва на складе
  async createOrderItem(dto: CreateOrderItem) {
    const orderItem = await this.addressRepository.create(dto);
    return orderItem;
  }

  async getAll() {
    const orderItem = await this.addressRepository.findAll({
      include: { all: true },
    });
    return orderItem;
  }
}
