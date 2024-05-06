import { Module } from '@nestjs/common';
import { VariationOptionController } from './variation-option.controller';
import { VariationOptionService } from './variation-option.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Variation } from 'src/variation/variation.model';
import { VariationOption } from './variation-option.model';
import { ProductItem } from 'src/product-item/product-item.model';
import { ProductConfiguration } from 'src/product-item/product-configuration.model';

@Module({
  controllers: [VariationOptionController],
  providers: [VariationOptionService],
  imports: [
    SequelizeModule.forFeature([
      Variation,
      VariationOption,
      ProductItem,
      ProductConfiguration,
    ]),
  ],
  exports: [VariationOptionService],
})
export class VariationOptionModule {}
