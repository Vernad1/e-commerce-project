import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductItem } from './product-item.model';
import { VariationOption } from 'src/variation-option/variation-option.model';

@Table({
  tableName: 'product-configuration',
  createdAt: false,
  updatedAt: false,
})
export class ProductConfiguration extends Model<ProductConfiguration> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => ProductItem)
  @Column({
    type: DataType.INTEGER,
  })
  productItemId: number;

  @ForeignKey(() => VariationOption)
  @Column({
    type: DataType.INTEGER,
  })
  variationOptionId: number;
}
