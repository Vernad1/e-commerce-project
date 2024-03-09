import { Injectable } from '@nestjs/common';
import { ProductCategory } from './product-category.model';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectModel(ProductCategory)
    private productCategoryRepo: typeof ProductCategory,
  ) {}
  async createProductCategory(dto: CreateProductCategoryDto) {
    const productCategory = await this.productCategoryRepo.create(dto);
    return productCategory;
  }
  async getAllProductCategory() {
    const productCategory = await this.productCategoryRepo.findAll({
      include: { all: true },
    });
    return productCategory;
  }
}
