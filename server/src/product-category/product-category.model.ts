import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/product/product.model';
import { Variation } from 'src/variation/variation.model';

interface ProductCategoryCreationAttrs {
  userId: number;
  parentCategoryId?: number;
  categoryName: string;
}

@Table({ tableName: 'product-category' })
export class ProductCategory extends Model<
  ProductCategory,
  ProductCategoryCreationAttrs
> {
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
    defaultValue: null,
  })
  parentCategoryId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  categoryName: string;

  @HasMany(() => Product)
  product: Product[];

  @BelongsTo(() => ProductCategory)
  parentCategory: ProductCategory;

  // @HasMany(() => Variation)
  // variations: Variation[];
}
