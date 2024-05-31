import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductItem } from './product-item.model';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { VariationService } from 'src/variation/variation.service';
import { VariationOptionService } from 'src/variation-option/variation-option.service';
import { Sequelize } from 'sequelize-typescript';
import { Product } from 'src/product/product.model';
import { ProductConfiguration } from './product-configuration.model';
import { VariationOption } from 'src/variation-option/variation-option.model';
import { Variation } from 'src/variation/variation.model';
import { Details } from 'src/details/details.model';
import { ProductImage } from 'src/product-image/product-image.model';

@Injectable()
export class ProductItemService {
  readonly skuLength = 8;

  constructor(
    @InjectModel(ProductItem)
    private productItemRepo: typeof ProductItem,
    private variationService: VariationService,
    private variationOptionService: VariationOptionService,
  ) {}

  async createProductItem(dto: CreateProductItemDto) {
    const productItem = await this.productItemRepo.create(dto);
    const sku = this.generateSku(productItem.id);
    productItem.sku = sku;
    await productItem.save();

    if (!dto.config[0]?.option || !dto.config[0]?.variation) {
      throw new HttpException('Отсутствует конфиг', HttpStatus.BAD_REQUEST);
    }

    for (let config of dto.config) {
      const variation = await this.variationService.getVariationByName(
        config.variation,
      );
      const option = await this.variationOptionService.getVariationByValue(
        config.option,
      );

      if (option) {
        await productItem.$add('configuration', [option.id]);
      } else {
        if (variation) {
          const newOption =
            await this.variationOptionService.createVariationOption({
              variationId: variation.id,
              value: config.option,
            });
          await productItem.$add('configuration', [newOption.id]);
        } else {
          const Product = await this.getProductItemById(productItem.id);

          const newVariation = await this.variationService.createVariation({
            categoryId: Product.product.categoryId,
            name: config.variation,
          });

          const newOption =
            await this.variationOptionService.createVariationOption({
              variationId: newVariation.id,
              value: config.option,
            });
          await productItem.$add('configuration', [newOption.id]);
        }
      }
    }

    return productItem;
  }

  async getProductItemById(id: number) {
    const productItem = await this.productItemRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return productItem;
  }

  async getSizeByProductId(id: number) {
    const productItem = await this.productItemRepo.findAll({
      where: {},
      include: [
        {
          model: Product,
          where: { id },
        },
        {
          model: VariationOption,
          include: [
            {
              model: Variation,
            },
          ],
        },
      ],
    });
    return productItem;
  }

  async getAllProductItem() {
    const productItem = await this.productItemRepo.findAll({
      where: {},

      attributes: ['id', 'productId', 'sku', 'quantity'],
      include: [
        {
          model: VariationOption,
          attributes: ['id', 'variationId', 'value'],
          include: [
            {
              model: Variation,
              attributes: ['id', 'categoryId', 'name'],
            },
          ],
        },
        {
          model: Product,
          attributes: ['id', 'name', 'description', 'price'],

          include: [
            { model: Details },
            {
              model: ProductImage,
              attributes: ['id', 'image'],
            },
          ],
        },
      ],
    });
    return productItem;
  }

  async getProductItemsByProduct(productId: number) {
    const productItem = await this.productItemRepo.findAll({
      where: {
        productId,
      },

      attributes: ['id', 'productId', 'sku', 'quantity'],
      include: [
        {
          model: VariationOption,
          attributes: ['id', 'variationId', 'value'],
          include: [
            {
              model: Variation,
              attributes: ['id', 'categoryId', 'name'],
            },
          ],
        },
        {
          model: Product,
          attributes: ['id', 'name', 'description', 'price'],

          include: [
            { model: Details },
            {
              model: ProductImage,
              attributes: ['id', 'image'],
            },
          ],
        },
      ],
    });
    return productItem;
  }

  generateSku(id: number): string {
    const resId = id.toString();
    let res = resId;
    console.log(this);
    while (res.length < this.skuLength) {
      res = '0' + res;
    }
    return res;
  }
}
