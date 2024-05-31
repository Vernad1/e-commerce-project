import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
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
import { ShoppingCartItemService } from 'src/shopping-cart-item/shopping-cart-item.service';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart) private shoppingCartRepo: typeof ShoppingCart,
    @Inject(forwardRef(() => ShoppingCartItemService))
    private readonly shoppingCartItemService: ShoppingCartItemService,
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
          model: ShoppingCartItem,
          attributes: ['id', 'quantityInCart'],
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
                    {
                      model: Details,
                      attributes: ['id', 'name', 'value'],
                    },
                    {
                      model: ProductImage,
                      attributes: ['id', 'image'],
                    },
                  ],
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
        model: ShoppingCartItem,
        where: {},
        include: [
          {
            model: ProductItem,
            where: {
              id: productId,
            },
          },
        ],
      },
    });
    if (shoppingCart) {
      return true;
    } else {
      return false;
    }
  }

  async addToShoppingCart(addToShoppingCartDto: AddToShopptingCartDto) {
    let shoppingCart = await this.getByUserId(addToShoppingCartDto.userId);
    if (!shoppingCart) {
      throw new HttpException(
        'Отсутсвует корзина! Обратитесь в службку поддержки!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      if (
        await this.ifProductInCart(
          shoppingCart.id,
          addToShoppingCartDto.productItemId,
        )
      ) {
        const currentShoppingCartItem =
          await this.shoppingCartItemService.findShoppingCartItemByDto({
            cartId: shoppingCart.id,
            productItemId: addToShoppingCartDto.productItemId,
          });
        currentShoppingCartItem.quantityInCart += 1;
        await currentShoppingCartItem.save();
      } else {
        const shoppingCartItem =
          await this.shoppingCartItemService.createShoppingCartItem({
            cartId: shoppingCart.id,
            productItemId: addToShoppingCartDto.productItemId,
          });
      }
      shoppingCart = await this.getByUserId(addToShoppingCartDto.userId);

      return shoppingCart;
    }
  }
}
