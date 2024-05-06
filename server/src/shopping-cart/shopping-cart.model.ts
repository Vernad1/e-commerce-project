import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductItem } from 'src/product-item/product-item.model';
import { User } from 'src/user/user.model';
import { ShoppingCartItem } from '../shopping-cart-item/shopping-cart-item.model';

interface ShoppingCartCreationAttrs {
  userId: number;
}
@Table({ tableName: 'shopping-cart' })
export class ShoppingCart extends Model<
  ShoppingCart,
  ShoppingCartCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => ProductItem, () => ShoppingCartItem)
  products: ProductItem[];
}
