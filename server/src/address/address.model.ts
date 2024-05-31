import {
  BelongsTo,
  Column,
  DataType,
<<<<<<< Updated upstream
=======
  ForeignKey,
  HasMany,
>>>>>>> Stashed changes
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
<<<<<<< Updated upstream
import { UserAddress } from './user-address.model';
=======
import { ShopOrder } from 'src/shop-order/shop-order.model';
>>>>>>> Stashed changes

interface AddressCreationAttrs {
  city: string;
  region: string;
  street: string;
  houseNumber: string;
  apartment: string;
  postcode: string;
}

@Table({ tableName: 'address' })
export class Address extends Model<Address, AddressCreationAttrs> {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  region: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  houseNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  apartment: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  postcode: string;

<<<<<<< Updated upstream
  @BelongsToMany(() => User, () => UserAddress)
  user: User[];
=======
  @BelongsTo(() => User)
  user: User;

  @HasMany(() => ShopOrder)
  shopOrders: ShopOrder[];
>>>>>>> Stashed changes
}
