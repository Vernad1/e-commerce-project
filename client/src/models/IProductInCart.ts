export interface IProductInCart {
  id?: number;
  quantityInCart: number;

  productItem?: {
    id: number;
    quantity: number;
    sku: string;
    configuration?: {
      id: number;
      value: string;
      variation: {
        name: string;
      };
    }[];

    product?: {
      id: number;
      name: string;
      description: string;
      price: number;

      details: {
        id: number;
        name: string;
        value: string;
      }[];

      ProductImage: {
        id: number;
        productId: string;
        image: string;
      }[];
    };
  };

  product?: {
    id: number;
    name: string;
    description: string;
    price: number;

    details: {
      id: number;
      name: string;
      value: string;
    }[];

    ProductImage: {
      id: number;
      productId: string;
      image: string;
    }[];
  };
}
