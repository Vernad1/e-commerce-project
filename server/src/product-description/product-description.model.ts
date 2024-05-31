import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/product/product.model';

interface ProductDescriptionCreationAttrs {
  productId: number;
  value: string;
}

@Table({ tableName: 'product-description' })
export class ProductDescription extends Model<
  ProductDescription,
  ProductDescriptionCreationAttrs
> {
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
  value: string;

  @BelongsTo(() => Product)
  product: Product;
}
