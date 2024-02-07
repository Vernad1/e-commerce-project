import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { UserAddress } from './user-address.model';

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

  @BelongsToMany(() => User, () => UserAddress)
  user: User[];
}
