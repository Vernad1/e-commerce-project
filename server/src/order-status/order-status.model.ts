import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ShopOrder } from 'src/shop-order/shop-order.model';

interface OrderStatusCreationAttrs {
  name: string;
}

@Table({ tableName: 'order-status' })
export class OrderStatus extends Model<OrderStatus, OrderStatusCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => ShopOrder)
  shopOrders: ShopOrder[];
}
