import { IFilterProduct } from "../models/IFilterProduct";

export const fromArrayToUrlParams = (array: Array<IFilterProduct>) => {
  return "?" + array.map((item) => `${item.name}=${item.value}`).join("&");
};
