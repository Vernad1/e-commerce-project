import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import style from "./sizesTable.module.css";
import { useParams } from "react-router-dom";
import { CreateSize } from "../../../components/modals/create-size/CreateSize";

export const SizesTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();

  const { data, loading, error } = useFetch(
    `/product-item/${params.productid}`
  );

  return (
    <>
      {error ? (
        <h2>Что то пошло не так</h2>
      ) : loading ? (
        <h2>Загрузка</h2>
      ) : (
        <>
          <h2>Размеры</h2>
          <button onClick={() => setIsModalOpen(true)}>Добавить</button>
          <table className={style.table}>
            <thead>
              <tr className={style.row}>
                <th>id</th>
                <th>Назание</th>
                <th>SKU</th>
                <th>Размер</th>
                <th>Количество</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((productItem: any) => {
                return (
                  <tr key={productItem.id} className={style.row}>
                    <td>{productItem?.id}</td>
                    <td>{productItem?.product?.name}</td>
                    <td>{productItem?.sku}</td>
                    <td>
                      {
                        productItem?.configuration?.find(
                          (conf: any) => conf?.variation?.name === "Размер"
                        )?.value
                      }
                    </td>
                    <td>{productItem?.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {isModalOpen && (
            <CreateSize handleClose={() => setIsModalOpen(false)}></CreateSize>
          )}
        </>
      )}
    </>
  );
};
