import React, { useState } from "react";
import style from "./productTable.module.css";
import useFetch from "../../../hooks/useFetch";
import { fromArrayToUrlParams } from "../../../utils/fromArrayToUrlParams";
import { IProduct } from "../../../models/IProduct";
import { CreateProduct } from "../../../components/modals/create-product/CreateProduct";
import { Link } from "react-router-dom";

export const ProductTable = () => {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  const { data, loading, error } = useFetch("/product");

  return (
    <>
      {error ? (
        <h2>Что то пошло не так</h2>
      ) : loading ? (
        <h2>Загрузка</h2>
      ) : (
        <>
          <h2>Товары</h2>
          <button onClick={() => setIsProductOpen(true)}>Добавить</button>
          <table>
            <thead>
              <tr className={style.row}>
                <th>id</th>
                <th>Изображение</th>
                <th>Название</th>
                <th>Цена</th>
                <th>Детали</th>
                <th>Размеры</th>
                <th>Количество</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((product: IProduct) => {
                return (
                  <tr key={product.id} className={style.row}>
                    <td>{product.id}</td>
                    <td className={style.image}>
                      <img
                        src={
                          import.meta.env.VITE_API_URL +
                          product.ProductImage[0].image
                        }
                      ></img>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>Открыть детали</td>
                    <td>
                      <Link to={`/admin/sizes/${product.id}`}>
                        Открыть размеры
                      </Link>
                    </td>
                    <td>
                      {product.ProductItems[0]
                        ? product.ProductItems[0].quantity
                        : 20}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {isProductOpen && (
            <CreateProduct
              handleClose={() => setIsProductOpen(false)}
            ></CreateProduct>
          )}
        </>
      )}
    </>
  );
};
