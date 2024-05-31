import { Module } from '@nestjs/common';
import { ShopOrderService } from './shop-order.service';
import { ShopOrderController } from './shop-order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderItem } from 'src/order-item/order-item.model';
import { ShopOrder } from './shop-order.model';
import { User } from 'src/user/user.model';
import { Address } from 'src/address/address.model';
import { OrderStatus } from 'src/order-status/order-status.model';

@Module({
  providers: [ShopOrderService],
  controllers: [ShopOrderController],
  imports: [
    SequelizeModule.forFeature([
      OrderItem,
      ShopOrder,
      User,
      Address,
      OrderStatus,
    ]),
  ],
})
export class ShopOrderModule {}
