//TODO сделать product_image
export class CreateProductItemDto {
  readonly productId: number;
  readonly quantity: number;
  readonly config: Config[];
}

interface Config {
  variation: string;
  option: string;
}
