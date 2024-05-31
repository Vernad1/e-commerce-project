import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VariationOption } from './variation-option.model';
import { CreateVariationOptionDto } from './dto/create-variation-option.dto';

@Injectable()
export class VariationOptionService {
  constructor(
    @InjectModel(VariationOption)
    private variationOptionRepo: typeof VariationOption,
  ) {}
  async createVariationOption(dto: CreateVariationOptionDto) {
    const variationOption = await this.variationOptionRepo.create(dto);
    return variationOption;
  }
  async getAllVariationOption() {
    const variationOption = await this.variationOptionRepo.findAll({
      include: { all: true },
    });
    return variationOption;
  }

  async getVariationByValue(value) {
    const variationOption = await this.variationOptionRepo.findOne({
      where: { value },
    });
    return variationOption;
  }
}
