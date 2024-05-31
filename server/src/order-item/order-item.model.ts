import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductItem } from 'src/product-item/product-item.model';
import { ShopOrder } from 'src/shop-order/shop-order.model';

interface OrderItemCreationAttrs {
  productItemId: number;
  shopOrderId: number;
  price: number;
  quantity: number;
}

@Table({ tableName: 'order-item' })
export class OrderItem extends Model<OrderItem, OrderItemCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @ForeignKey(() => ProductItem)
  @Column({ type: DataType.INTEGER })
  productItemId: number;

  @BelongsTo(() => ProductItem)
  productItem: ProductItem;

  @ForeignKey(() => ShopOrder)
  @Column({ type: DataType.INTEGER })
  shopOrderId: number;

  @BelongsTo(() => ShopOrder)
  shopOrder: ShopOrder;
}
