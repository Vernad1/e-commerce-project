import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Address } from '../address/address.model';
<<<<<<< Updated upstream
import { UserAddress } from '../address/user-address.model';
=======
import { ShoppingCart } from 'src/shopping-cart/shopping-cart.model';
import { ShopOrder } from 'src/shop-order/shop-order.model';
>>>>>>> Stashed changes

@Module({
  controllers: [UserController],
  providers: [UserService],
<<<<<<< Updated upstream
  imports: [SequelizeModule.forFeature([User, Address, UserAddress])],
=======
  imports: [
    SequelizeModule.forFeature([User, Address, ShoppingCart, ShopOrder]),
  ],
>>>>>>> Stashed changes
  exports: [UserService],
})
export class UserModule {}
