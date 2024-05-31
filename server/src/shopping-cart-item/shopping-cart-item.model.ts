import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ShoppingCart } from '../shopping-cart/shopping-cart.model';
import { ProductItem } from 'src/product-item/product-item.model';

@Table({ tableName: 'shopping-cart-item' })
export class ShoppingCartItem extends Model<ShoppingCartItem> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  quantityInCart: number;

  @ForeignKey(() => ShoppingCart)
  @Column({ type: DataType.INTEGER })
  cartId: number;

  @BelongsTo(() => ShoppingCart)
  cart: ShoppingCart;

  @ForeignKey(() => ProductItem)
  @Column({ type: DataType.INTEGER })
  productItemId: number;

  @BelongsTo(() => ProductItem)
  productItem: ProductItem;
}
