import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Address } from './address.model';

@Table({ tableName: 'user_address', createdAt: false, updatedAt: false })
export class UserAddress extends Model<UserAddress> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: string;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.INTEGER,
  })
  addressId: string;
}
