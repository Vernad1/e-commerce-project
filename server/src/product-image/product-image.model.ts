import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Product } from 'src/product/product.model';

interface ProductImageCreationAttrs {
  productId: number;
  image: string;
}

@Table({ tableName: 'product-image' })
export class ProductImage extends Model<
  ProductImage,
  ProductImageCreationAttrs
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
  })
  image: string;
}
