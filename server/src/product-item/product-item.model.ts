import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/product/product.model';
import { VariationOption } from 'src/variation-option/variation-option.model';
import { ProductConfiguration } from './product-configuration.model';
import { ShoppingCart } from 'src/shopping-cart/shopping-cart.model';
import { ShoppingCartItem } from 'src/shopping-cart-item/shopping-cart-item.model';
import { OrderItem } from 'src/order-item/order-item.model';

interface Config {
  variation: string;
  option: string;
}

interface ProductItemCreationAttrs {
  productId: number;
  quantity: number;
  price: number;
  config: Config[];
}

@Table({ tableName: 'product-item' })
export class ProductItem extends Model<ProductItem, ProductItemCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  productId: number;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  sku: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsToMany(() => VariationOption, () => ProductConfiguration)
  configuration: VariationOption[];

  @HasMany(() => ShoppingCartItem)
  shoppingCartItems: ShoppingCartItem[];

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];
}
