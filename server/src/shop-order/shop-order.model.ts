import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Address } from 'src/address/address.model';
import { OrderItem } from 'src/order-item/order-item.model';
import { OrderStatus } from 'src/order-status/order-status.model';
import { User } from 'src/user/user.model';

interface ShopOrderCreationAttrs {
  userId: number;
  addressId: number;
  orderTotal: number;
  orderStatusId: number;
}

@Table({ tableName: 'shop-order' })
export class ShopOrder extends Model<ShopOrder, ShopOrderCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  orderDate: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderTotal: number;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Address)
  @Column({ type: DataType.INTEGER })
  addressId: number;

  @BelongsTo(() => Address)
  address: Address;

  @ForeignKey(() => OrderStatus)
  @Column({ type: DataType.INTEGER })
  orderStatusId: number;

  @BelongsTo(() => OrderStatus)
  orderStatus: OrderStatus;
}
