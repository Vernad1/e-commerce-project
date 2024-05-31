import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCartItem } from './shopping-cart-item.model';
import { ShoppingCartService } from 'src/shopping-cart/shopping-cart.service';
import { ShoppingCartItemDto } from './dto/stopping-cart-item.dto';

@Injectable()
export class ShoppingCartItemService {
  constructor(
    @InjectModel(ShoppingCartItem)
    private shoppingCartItemRepo: typeof ShoppingCartItem,
    @Inject(forwardRef(() => ShoppingCartService))
    private readonly shoppingCartService: ShoppingCartService,
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

  async addQuantity(shoppingCartItemDto: ShoppingCartItemDto) {
    let shoppingCart = await this.shoppingCartService.getByUserId(
      shoppingCartItemDto.userId,
    );
    if (!shoppingCart) {
      throw new HttpException(
        'Отсутсвует корзина! Обратитесь в службку поддержки!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const shoppingCartItem = await this.shoppingCartItemRepo.findOne({
        where: {
          cartId: shoppingCart.id,
          productItemId: shoppingCartItemDto.productItemId,
        },
      });
      if (!shoppingCartItem) {
        throw new HttpException('Отсутсвует товар!', HttpStatus.BAD_REQUEST);
      }
      shoppingCartItem.quantityInCart += 1;
      await shoppingCartItem.save();
      shoppingCart = await this.shoppingCartService.getByUserId(
        shoppingCartItemDto.userId,
      );
      return shoppingCart;
    }
  }

  async removeQuantity(shoppingCartItemDto: ShoppingCartItemDto) {
    let shoppingCart = await this.shoppingCartService.getByUserId(
      shoppingCartItemDto.userId,
    );
    if (!shoppingCart) {
      throw new HttpException(
        'Отсутсвует корзина! Обратитесь в службку поддержки!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const shoppingCartItem = await this.shoppingCartItemRepo.findOne({
        where: {
          cartId: shoppingCart.id,
          productItemId: shoppingCartItemDto.productItemId,
        },
      });

      if (!shoppingCartItem) {
        throw new HttpException('Отсутсвует товар!', HttpStatus.BAD_REQUEST);
      }
      if (shoppingCartItem.quantityInCart === 1) {
        await shoppingCartItem.destroy();
        shoppingCart = await this.shoppingCartService.getByUserId(
          shoppingCartItemDto.userId,
        );
        return shoppingCart;
      } else {
        shoppingCartItem.quantityInCart -= 1;
        await shoppingCartItem.save();
      }
      shoppingCart = await this.shoppingCartService.getByUserId(
        shoppingCartItemDto.userId,
      );
      return shoppingCart;
    }
  }
}
