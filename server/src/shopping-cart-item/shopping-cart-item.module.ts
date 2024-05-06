import { Module } from '@nestjs/common';
import { ShoppingCartItemService } from './shopping-cart-item.service';
import { ShoppingCartItemController } from './shopping-cart-item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShoppingCart } from 'src/shopping-cart/shopping-cart.model';
import { ProductItem } from 'src/product-item/product-item.model';
import { ShoppingCartModule } from 'src/shopping-cart/shopping-cart.module';
import { ShoppingCartItem } from './shopping-cart-item.model';

@Module({
  providers: [ShoppingCartItemService],
  controllers: [ShoppingCartItemController],
  imports: [
    SequelizeModule.forFeature([ShoppingCart, ProductItem, ShoppingCartItem]),
    ShoppingCartModule,
  ],
})
export class ShoppingCartItemModule {}
