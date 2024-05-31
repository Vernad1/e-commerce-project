import { Module } from '@nestjs/common';
import { VariationService } from './variation.service';
import { VariationController } from './variation.controller';
import { Variation } from './variation.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductCategory } from 'src/product-category/product-category.model';

@Module({
  providers: [VariationService],
  controllers: [VariationController],
  imports: [SequelizeModule.forFeature([ProductCategory, Variation])],
  exports: [VariationService],
})
export class VariationModule {}
