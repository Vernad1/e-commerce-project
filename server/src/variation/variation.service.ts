import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Variation } from './variation.model';
import { CreateVariationDto } from './dto/create-variation.dto';

@Injectable()
export class VariationService {
  constructor(
    @InjectModel(Variation)
    private variationRepo: typeof Variation,
  ) {}
  async createVariation(dto: CreateVariationDto) {
    const variation = await this.variationRepo.create(dto);
    return variation;
  }
  async getAllVariation() {
    const variation = await this.variationRepo.findAll({
      include: { all: true },
    });
    return variation;
  }

  async getVariationByName(name: string) {
    const variation = await this.variationRepo.findOne({
      where: { name },
    });
    return variation;
  }
}
