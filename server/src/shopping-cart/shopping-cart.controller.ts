import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { AddToShopptingCartDto } from './dto/add-to-shopping-cart.dto';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private shoppingCartService: ShoppingCartService) {}
  @Post()
  create(@Body() shoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.createCart(shoppingCartDto);
  }

  @Get()
  getAll() {
    return this.shoppingCartService.getAllCarts();
  }

  @Get('/:userid')
  getByUser(@Param('userid') userid: number) {
    return this.shoppingCartService.getByUserId(userid);
  }

  @Post('/add')
  addToShoppingCart(@Body() addToShoppingCartDto: AddToShopptingCartDto) {
    return this.shoppingCartService.addToShoppingCart(addToShoppingCartDto);
  }
}
