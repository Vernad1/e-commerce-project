import { Module } from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { ProductImageController } from './product-image.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/product/product.model';
import { ProductImage } from './product-image.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [ProductImageService],
  controllers: [ProductImageController],
  imports: [SequelizeModule.forFeature([Product, ProductImage]), FilesModule],
})
export class ProductImageModule {}
