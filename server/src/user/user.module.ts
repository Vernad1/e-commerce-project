import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Address } from '../address/address.model';
import { ShoppingCart } from 'src/shopping-cart/shopping-cart.model';
import { ShopOrder } from 'src/shop-order/shop-order.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, Address, ShoppingCart, ShopOrder]),
  ],
  exports: [UserService],
})
export class UserModule {}
