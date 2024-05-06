import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './shopping-cart.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { ProductItem } from 'src/product-item/product-item.model';

@Module({
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  imports: [SequelizeModule.forFeature([ShoppingCart, User, ProductItem])],
  exports: [ShoppingCartService],
})
export class ShoppingCartModule {}
