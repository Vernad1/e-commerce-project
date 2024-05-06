import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductCategory } from 'src/product-category/product-category.model';
import { Details } from 'src/details/details.model';
import { ProductDetails } from 'src/details/product-details.model';
import { DetailsModule } from 'src/details/details.module';
import { ProductDescription } from 'src/product-description/product-description.model';
import { ProductImage } from 'src/product-image/product-image.model';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    SequelizeModule.forFeature([
      Product,
      ProductCategory,
      Details,
      ProductDetails,
      ProductDescription,
      ProductImage,
    ]),
    DetailsModule,
  ],
})
export class ProductModule {}
