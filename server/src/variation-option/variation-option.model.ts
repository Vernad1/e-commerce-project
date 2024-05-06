import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { ProductConfiguration } from 'src/product-item/product-configuration.model';
import { ProductItem } from 'src/product-item/product-item.model';
import { Variation } from 'src/variation/variation.model';

interface VariationOptionCreationAttrs {
  variationId: number;
  value: string;
}

@Table({ tableName: 'variation-option' })
export class VariationOption extends Model<
  VariationOption,
  VariationOptionCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Variation)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  variationId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @BelongsTo(() => Variation)
  variation: Variation;

  @BelongsToMany(() => ProductItem, () => ProductConfiguration)
  products: ProductItem[];
}
