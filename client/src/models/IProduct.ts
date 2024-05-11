export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;

  productCategory: {
    id: number;
    parentCategoryId: number;
    categoryName: string;
  };

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

  productDescription?: {
    id: number;
    productId: number;
    value: string;
  }[];

  productItems?: {
    id: number;
    quantity: number;
    sku: string;
    configuration: {
      id: number;
      value: string;
      variation: {
        name: string;
      };
    }[];
  }[];
}
