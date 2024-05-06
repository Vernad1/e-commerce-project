import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Address } from '../address/address.model';
import { ShoppingCart } from 'src/shopping-cart/shopping-cart.model';

interface UserCreationAttrs {
  email: string;
  password: string;
  phone_number?: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    defaultValue: null,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Address)
  address: Address[];

  @HasMany(() => ShoppingCart)
  shoppingCart: ShoppingCart[];
}
