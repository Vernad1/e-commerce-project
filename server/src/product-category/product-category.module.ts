import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategory } from './product-category.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/product/product.model';
import { Variation } from 'src/variation/variation.model';

@Module({
  providers: [ProductCategoryService],
  controllers: [ProductCategoryController],
  imports: [SequelizeModule.forFeature([ProductCategory, Product, Variation])],
})
export class ProductCategoryModule {}
