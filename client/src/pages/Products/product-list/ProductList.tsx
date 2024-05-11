import React, { useRef } from "react";
import { Card } from "../card/Card";
import style from "./productsList.module.css";
import useFetch from "../../../hooks/useFetch";
import { IProduct } from "../../../models/IProduct";
import { fromArrayToUrlParams } from "../../../utils/fromArrayToUrlParams";

interface ProductListProps {
  catId: number;
  maxPrice: string;
  sort: string | null;
  filters: Array<any>;
}

export const ProductList: React.FC<ProductListProps> = ({ filters }) => {
  // const [data, setData] = useState<IProduct[]>([]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/product/")
  //     .then((response) => response.json())
  //     .then((data) => setData(data))
  //     .catch((e) => console.log(e));
  // }, []);

  const { data, loading, error } = useFetch(
    `/product${filters.length ? fromArrayToUrlParams(filters) : ""}`
  );

  return (
    <div className={style.listContainer}>
      {error
        ? "Что то пошло не так"
        : loading
        ? "Загрузка"
        : data?.map((product: IProduct) => {
            return <Card key={product.id} cardInfo={product}></Card>;
          })}
    </div>
  );
};
