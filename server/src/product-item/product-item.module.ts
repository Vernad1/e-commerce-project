import { Module } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { ProductItemController } from './product-item.controller';
import { Product } from 'src/product/product.model';
import { ProductItem } from './product-item.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { VariationOption } from 'src/variation-option/variation-option.model';
import { ProductConfiguration } from './product-configuration.model';
import { VariationModule } from 'src/variation/variation.module';
import { VariationOptionModule } from 'src/variation-option/variation-option.module';
import { ShoppingCart } from 'src/shopping-cart/shopping-cart.model';
import { ShoppingCartItemModule } from 'src/shopping-cart-item/shopping-cart-item.module';
import { ShoppingCartItem } from 'src/shopping-cart-item/shopping-cart-item.model';
import { OrderItem } from 'src/order-item/order-item.model';

@Module({
  providers: [ProductItemService],
  controllers: [ProductItemController],
  imports: [
    SequelizeModule.forFeature([
      Product,
      ProductItem,
      VariationOption,
      ProductConfiguration,
      ShoppingCart,
      ShoppingCartItem,
      OrderItem,
    ]),
    VariationModule,
    VariationOptionModule,
    ShoppingCartItemModule,
  ],
})
export class ProductItemModule {}
