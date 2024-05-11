import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Details } from 'src/details/details.model';
import { ProductDetails } from 'src/details/product-details.model';
import { ProductCategory } from 'src/product-category/product-category.model';
import { ProductDescription } from 'src/product-description/product-description.model';
import { ProductImage } from 'src/product-image/product-image.model';
import { ProductItem } from 'src/product-item/product-item.model';

interface ProductCreationAttrs {
  categoryId: number;
  name: string;
  description: string;
  price: string;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductCreationAttrs> {
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
  })
  categoryId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @BelongsTo(() => ProductCategory)
  productCategory: ProductCategory;

  @HasMany(() => ProductItem)
  ProductItems: ProductItem[];

  @BelongsToMany(() => Details, () => ProductDetails)
  details: Details[];

  @HasMany(() => ProductDescription)
  productDescription: ProductDescription[];

  @HasMany(() => ProductImage)
  ProductImage: ProductImage[];
}
