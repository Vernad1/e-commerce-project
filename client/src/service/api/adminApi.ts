import { $host } from ".";
import { IProductItem } from "../../models/IProductItem";

interface CreateProductItemDto {
  readonly productId: number;
  readonly quantity: number;
  readonly config: Config[];
}
interface Config {
  variation: string;
  option: string;
}

export const addProduct = async (productData: {
  name: string;
  categoryId: string;
  description: string;
  price: string;
  image: any;
  details: any[];
}) => {
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("categoryId", productData.categoryId);
  formData.append("description", productData.description);
  formData.append("price", productData.price);
  formData.append("image", productData.image);

  for (let i = 0; i < productData.details.length; i++) {
    formData.append(`details[${i}][name]`, productData.details[i].name);
    formData.append(`details[${i}][value]`, productData.details[i].value);
  }

  const { data } = await $host.post("product", formData);

  return data;
};

export const addBrand = async (brandName: string) => {
  const detailData = { name: "бренд", value: brandName };
  const { data } = await $host.post("details", detailData);
  return data;
};

export const addCategory = async (categoryData: {
  categoryName: string;
  parentCategoryId?: number;
}) => {
  const { data } = await $host.post("product-category", categoryData);
  return data;
};

export const addSize = async (params: {
  productId: number;
  sizeNumber: string;
  quantity: string;
}) => {
  const sizeData: CreateProductItemDto = {
    productId: params.productId,
    quantity: Number(params.quantity),
    config: [{ variation: "Размер", option: params.sizeNumber }],
  };
  const { data } = await $host.post("product-item", sizeData);
  return data;
};
