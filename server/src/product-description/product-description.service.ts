import { Injectable } from '@nestjs/common';
import { ProductDescription } from './product-description.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDescription } from './dto/create-product-description';

@Injectable()
export class ProductDescriptionService {
  constructor(
    @InjectModel(ProductDescription)
    private descriptonRepository: typeof ProductDescription,
  ) {}

  async createDescription(dto: CreateProductDescription) {
    const descripton = await this.descriptonRepository.create(dto);
    return descripton;
  }

  async getAllDescription() {
    const descriptions = await this.descriptonRepository.findAll();
    return descriptions;
  }
}
