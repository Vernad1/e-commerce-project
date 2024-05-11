import { Injectable } from '@nestjs/common';
import { CreateDetailDto } from './dto/create-detail.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Details } from './details.model';
import { Product } from 'src/product/product.model';
import { ProductCategory } from 'src/product-category/product-category.model';
import { Op } from 'sequelize';

@Injectable()
export class DetailsService {
  constructor(
    @InjectModel(Details) private detailsRepository: typeof Details,
  ) {}

  async createDetail(dto: CreateDetailDto) {
    const capitalizeDto = {
      name: dto.name[0].toUpperCase() + dto.name.slice(1),
      value: dto.value[0].toUpperCase() + dto.value.slice(1),
    };
    const detail = await this.detailsRepository.create(capitalizeDto);
    return detail;
  }

  async getByValue({ name, value }) {
    const capitalizeDto = {
      name: name[0].toUpperCase() + name.slice(1),
      value: value[0].toUpperCase() + value.slice(1),
    };
    const detail = await this.detailsRepository.findOne({
      where: {
        value: capitalizeDto.value,
        name: capitalizeDto.name,
      },
    });
    return detail;
  }

  async getAllDetails(params: any) {
    //Нашли детали те, которые соотвествуют нашим категориям
    const categoriesParams = params?.categories?.split(',');
    console.log(categoriesParams);
    const details = await this.detailsRepository.findAll({
      include: {
        model: Product,
        where: {},
        include: [
          {
            model: ProductCategory,
            where: categoriesParams
              ? {
                  categoryName: categoriesParams,
                }
              : {},
          },
        ],
      },
    });
    return details;
  }
}
