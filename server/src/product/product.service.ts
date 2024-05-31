import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DetailsService } from 'src/details/details.service';
import { Details } from 'src/details/details.model';
import { ProductCategory } from 'src/product-category/product-category.model';
import { ProductImage } from 'src/product-image/product-image.model';
import { Op } from 'sequelize';
import sequelize from 'sequelize';
import { ProductItem } from 'src/product-item/product-item.model';
import { VariationOption } from 'src/variation-option/variation-option.model';
import { Variation } from 'src/variation/variation.model';
import { ProductImageService } from 'src/product-image/product-image.service';

//TODO сделать product_image

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productRepo: typeof Product,
    private detailsService: DetailsService,
    private productImageService: ProductImageService,
  ) {}
  // async createProduct(dto: CreateProductDto) {
  //   const product = await this.productRepo.create(dto);
  //   return product;
  // }

  async createProduct(dto: CreateProductDto, image: any) {
    console.log({ dto });

    if (!dto.details || !dto.details[0]?.name || !dto.details[0]?.value) {
      console.log({ dto });
      throw new HttpException(
        'Отсутствует детали! Добавть пол, цвет и бренд!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const product = await this.productRepo.create(dto);

    for (let detail of dto.details) {
      const currentDetail = await this.detailsService.getByValue({
        name: detail.name,
        value: detail.value,
      });

      if (currentDetail) {
        await product.$add('details', [currentDetail.id]);
      } else {
        const newDetail = await this.detailsService.createDetail({
          name: detail.name,
          value: detail.value,
        });
        await product.$add('details', [newDetail.id]);
      }
    }

    await this.productImageService.create({ productId: product.id }, image);

    return product;
  }

  async getAllProduct() {
    const product = await this.productRepo.findAll({
      include: [
        {
          model: ProductCategory,
        },
        {
          model: Details,
        },
        {
          model: ProductImage,
        },
      ],
    });
    return product;
  }

  async getProductByBrand(brand: string) {
    brand = brand[0].toUpperCase() + brand.slice(1);

    const product = await this.productRepo.findAll({
      include: {
        model: Details,
        where: { name: 'Бренд', value: brand },
      },
    });
    return product;
  }

  async getFilteredProducts(params: any) {
    let arr = [];

    for (let param in params) {
      if (param == 'категории') {
        continue;
      } else {
        arr.push({ name: param, value: params[param] });
      }
    }

    const products = await this.productRepo.findAll({
      include: [
        {
          model: ProductCategory,
          where: [
            params['категории'] ? { categoryName: params['категории'] } : {},
          ],
        },
        {
          model: ProductImage,
          order: sequelize.fn('max', sequelize.col('id')),
        },
        {
          model: ProductImage,
          order: [[ProductImage, 'createdAt', 'DESC']],
        },
        {
          all: true,
        },
      ],
      order: [
        ['createdAt', 'ASC'],
        [ProductImage, 'createdAt', 'DESC'],
      ],
    });

    if (!arr.length) {
      return products;
    }

    //TODO Поискать еще способ фильтрации по нескольким записям в sequelize

    let tmp = false;
    const newProducts = products.filter((product) => {
      console.log({ product });
      for (let item of arr) {
        if (
          product.details.find(
            (detail) =>
              detail.name === item.name && detail.value === item.value,
          )
        ) {
          tmp = true;
        } else {
          tmp = false;
          break;
        }
      }
      if (tmp) {
        return product;
      }
    });

    return newProducts;
  }

  async getProductByCategories(categories: any) {
    const product = await this.productRepo.findAll({
      include: {
        model: ProductCategory,
        where: {
          categoryName: categories['категории'],
        },
      },
    });
    return product;
  }

  async getProductById(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      include: [
        { all: true },
        {
          model: ProductItem,
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
        },
      ],
      order: [[ProductImage, 'createdAt', 'DESC']],
    });
    return product;
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
}
