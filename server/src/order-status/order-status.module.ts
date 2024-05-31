import { Module } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { OrderStatusController } from './order-status.controller';
import { OrderStatus } from './order-status.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShopOrder } from 'src/shop-order/shop-order.model';

@Module({
  providers: [OrderStatusService],
  controllers: [OrderStatusController],
  imports: [SequelizeModule.forFeature([OrderStatus, ShopOrder])],
})
export class OrderStatusModule {}
