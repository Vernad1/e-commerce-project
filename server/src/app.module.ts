import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { User } from './user/user.model';
import { AddressModule } from './address/address.module';
import { Address } from './address/address.model';
import { AuthModule } from './auth/auth.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { ShoppingCart } from './shopping-cart/shopping-cart.model';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductCategory } from './product-category/product-category.model';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.model';
import { ProductItemModule } from './product-item/product-item.module';
import { ProductItem } from './product-item/product-item.model';
import { VariationModule } from './variation/variation.module';
import { Variation } from './variation/variation.model';
import { VariationOptionModule } from './variation-option/variation-option.module';
import { ProductConfiguration } from './product-item/product-configuration.model';
import { VariationOption } from './variation-option/variation-option.model';
import { DetailsModule } from './details/details.module';
import { ProductDetails } from './details/product-details.model';
import { Details } from './details/details.model';
import { ProductDescriptionModule } from './product-description/product-description.module';
import { ProductDescription } from './product-description/product-description.model';
import { ProductImageModule } from './product-image/product-image.module';
import { FilesModule } from './files/files.module';
import { ProductImage } from './product-image/product-image.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ShoppingCartItem } from './shopping-cart-item/shopping-cart-item.model';
import { ShoppingCartItemModule } from './shopping-cart-item/shopping-cart-item.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderItem } from './order-item/order-item.model';
import { ShopOrderModule } from './shop-order/shop-order.module';
import { ShopOrder } from './shop-order/shop-order.model';
import { OrderStatusModule } from './order-status/order-status.module';
import { OrderStatus } from './order-status/order-status.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve('./', 'public/image'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Address,
        ShoppingCart,
        ProductCategory,
        Product,
        ProductItem,
        ProductConfiguration,
        VariationOption,
        Variation,
        ProductDetails,
        Details,
        ProductDescription,
        ProductImage,
        ShoppingCartItem,
        OrderItem,
        ShopOrder,
        OrderStatus,
      ],
      autoLoadModels: true,
    }),
    UserModule,
    AddressModule,
    AuthModule,
    ShoppingCartModule,
    ProductCategoryModule,
    ProductModule,
    ProductItemModule,
    VariationModule,
    VariationOptionModule,
    ProductDetails,
    DetailsModule,
    ProductDescriptionModule,
    ProductImageModule,
    FilesModule,
    ShoppingCartItemModule,
    OrderItemModule,
    ShopOrderModule,
    OrderStatusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
