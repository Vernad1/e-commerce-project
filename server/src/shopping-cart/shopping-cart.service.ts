import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCart } from './shopping-cart.model';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { AddToShopptingCartDto } from './dto/add-to-shopping-cart.dto';
import { Op, where } from 'sequelize';
import { ProductItem } from 'src/product-item/product-item.model';
import { Product } from 'src/product/product.model';
import { ProductImage } from 'src/product-image/product-image.model';
import { ShoppingCartItem } from 'src/shopping-cart-item/shopping-cart-item.model';
import { Details } from 'src/details/details.model';
import { VariationOption } from 'src/variation-option/variation-option.model';
import { Variation } from 'src/variation/variation.model';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart) private shoppingCartRepo: typeof ShoppingCart,
  ) {}
  async createCart(dto: CreateShoppingCartDto) {
    const shoppingCart = await this.shoppingCartRepo.create(dto);
    return shoppingCart;
  }
  async getAllCarts() {
    const shoppingCart = await this.shoppingCartRepo.findAll({
      include: {
        all: true,
      },
    });
    return shoppingCart;
  }

  async getByUserId(userId: number) {
    const shoppingCart = await this.shoppingCartRepo.findOne({
      where: {
        userId,
      },
      attributes: ['id', 'userId'],
      include: [
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
    });
    return shoppingCart;
  }

  async ifProductInCart(cartId: number, productId: number) {
    const shoppingCart = await this.shoppingCartRepo.findOne({
      where: {
        id: cartId,
      },
      include: {
        model: ProductItem,
        where: {
          id: productId,
        },
      },
    });
    if (shoppingCart) {
      return true;
    } else {
      return false;
    }
  }

  async addToShoppingCart(addToShoppingCartDto: AddToShopptingCartDto) {
    const shoppingCart = await this.getByUserId(addToShoppingCartDto.userId);
    if (!shoppingCart) {
      throw new HttpException(
        'Отсутсвует корзина! Обратитесь в службку поддержки!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      console.log(shoppingCart.products);
      await shoppingCart.$add('products', [addToShoppingCartDto.productItemId]);
      await shoppingCart.save();

      if (
        this.ifProductInCart(
          shoppingCart.id,
          addToShoppingCartDto.productItemId,
        )
      ) {
        // shoppingCart.products?.ShoppingCartItem.quantity
      }
      return shoppingCart;
    }
  }
}
