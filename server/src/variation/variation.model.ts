import {
  Model,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { ProductCategory } from 'src/product-category/product-category.model';

interface VariationCreationAttrs {
  categoryId: number;
  name: string;
}

@Table({ tableName: 'variation' })
export class Variation extends Model<Variation, VariationCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => ProductCategory)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsTo(() => ProductCategory)
  productCategory: ProductCategory;
}
