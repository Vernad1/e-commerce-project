import { Module } from '@nestjs/common';
import { ProductDescriptionController } from './product-description.controller';
import { ProductDescriptionService } from './product-description.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/product/product.model';
import { ProductDescription } from './product-description.model';

@Module({
  controllers: [ProductDescriptionController],
  providers: [ProductDescriptionService],
  imports: [SequelizeModule.forFeature([Product, ProductDescription])],
})
export class ProductDescriptionModule {}
