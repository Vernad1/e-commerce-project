import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { OrderItem } from './order-item.model';
import { ProductItem } from 'src/product-item/product-item.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShopOrder } from 'src/shop-order/shop-order.model';

@Module({
  providers: [OrderItemService],
  controllers: [OrderItemController],
  imports: [SequelizeModule.forFeature([OrderItem, ProductItem, ShopOrder])],
})
export class OrderItemModule {}
