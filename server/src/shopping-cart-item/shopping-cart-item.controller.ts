import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShoppingCartItemService } from './shopping-cart-item.service';
import { ShoppingCartItemDto } from './dto/stopping-cart-item.dto';

@Controller('shopping-cart-item')
export class ShoppingCartItemController {
  constructor(private shoppingCartItemService: ShoppingCartItemService) {}

  @Get()
  getAllShoppingCartItem() {
    return this.shoppingCartItemService.getAll();
  }

  @Post('/add')
  addToShoppingCart(@Body() shoppingCartItemDto: ShoppingCartItemDto) {
    return this.shoppingCartItemService.addToShoppingCart(shoppingCartItemDto);
  }
}
