import { Module } from '@nestjs/common';
import { DetailsController } from './details.controller';
import { DetailsService } from './details.service';
import { Product } from 'src/product/product.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Details } from './details.model';
import { ProductDetails } from './product-details.model';
import { ProductCategory } from 'src/product-category/product-category.model';

@Module({
  controllers: [DetailsController],
  providers: [DetailsService],
  exports: [DetailsService],
  imports: [
    SequelizeModule.forFeature([
      Product,
      Details,
      ProductDetails,
      ProductCategory,
    ]),
  ],
})
export class DetailsModule {}
