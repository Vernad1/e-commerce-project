import { Injectable } from '@nestjs/common';
import { ShopOrder } from './shop-order.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateShopOrderDto } from './dto/create-shop-order.dto';

@Injectable()
export class ShopOrderService {
  constructor(
    @InjectModel(ShopOrder) private shopOrderRepository: typeof ShopOrder,
  ) {}

  async createShopOrder(dto: CreateShopOrderDto) {
    const shopOrder = await this.shopOrderRepository.create(dto);
    return shopOrder;
  }

  async getAll() {
    const shopOrder = await this.shopOrderRepository.findAll({
      include: { all: true },
    });
    return shopOrder;
  }
}
