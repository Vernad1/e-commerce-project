import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/product/product.model';
import { Details } from './details.model';

@Table({
  tableName: 'product-details',
  createdAt: false,
  updatedAt: false,
})
export class ProductDetails extends Model<ProductDetails> {
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

  @ForeignKey(() => Details)
  @Column({
    type: DataType.INTEGER,
  })
  detailsId: number;
}
