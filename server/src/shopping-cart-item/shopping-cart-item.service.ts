import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ShoppingCartItemDto } from './dto/stopping-cart-item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCartItem } from './shopping-cart-item.model';
import { ShoppingCartService } from 'src/shopping-cart/shopping-cart.service';

@Injectable()
export class ShoppingCartItemService {
  constructor(
    @InjectModel(ShoppingCartItem)
    private shoppingCartItemRepo: typeof ShoppingCartItem,
    private shoppingCartService: ShoppingCartService,
  ) {}

  async getAll() {
    const shoppingCartItem = await this.shoppingCartItemRepo.findAll({
      include: {
        all: true,
      },
    });
    return shoppingCartItem;
  }

  async findShoppingCartItemByDto({ cartId, productItemId }) {
    const shoppingCartItem = await this.shoppingCartItemRepo.findOne({
      where: {
        cartId,
        productItemId,
      },
    });
    return shoppingCartItem;
  }

  async createShoppingCartItem({ cartId, productItemId }) {
    const shoppingCartItem = await this.shoppingCartItemRepo.create({
      cartId,
      productItemId,
    });
    return shoppingCartItem;
  }

  async addToShoppingCart(shoppingCartItemDto: ShoppingCartItemDto) {
    const shoppingCart = await this.shoppingCartService.getByUserId(
      shoppingCartItemDto.userId,
    );

    if (!shoppingCart) {
      throw new HttpException(
        'Отсутсвует корзина! Обратитесь в службку поддержки!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      console.log({ id: shoppingCart.id, n: 1 });
      const isProductInCart = await this.shoppingCartService.ifProductInCart(
        shoppingCart.id,
        shoppingCartItemDto.productItemId,
      );
      if (isProductInCart) {
        console.log({ id: shoppingCart.id, n: 2 });

        const currentProductItem = await this.findShoppingCartItemByDto({
          cartId: shoppingCart.id,
          productItemId: shoppingCartItemDto.productItemId,
        });
        currentProductItem.quantity = currentProductItem.quantity + 1;
        await currentProductItem.save();
        return currentProductItem;
      } else {
        console.log({ id: shoppingCart.id, n: 3 });

        const currentProductItem = await this.createShoppingCartItem({
          cartId: shoppingCart.id,
          productItemId: shoppingCartItemDto.productItemId,
        });
        return currentProductItem;
      }
    }
  }
}
