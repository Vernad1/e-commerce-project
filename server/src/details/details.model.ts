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
import { Product } from 'src/product/product.model';
import { ProductDetails } from './product-details.model';

interface DetailsCreationAttrs {
  name: string;
  value: string;
}

@Table({ tableName: 'details' })
export class Details extends Model<Details, DetailsCreationAttrs> {
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @BelongsToMany(() => Product, () => ProductDetails)
  products: Product[];
}
