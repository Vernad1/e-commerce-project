//TODO сделать product_image
export class CreateProductDto {
  readonly categoryId: number;
  readonly name: string;
  readonly description: string;
  readonly price: string;
  readonly details: Detail[];
}

interface Detail {
  name: string;
  value: string;
}
