import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import style from "./brandTable.module.css";
import { CreateBrand } from "../../../components/modals/create-brand/CreateBrand";

export const BrandTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, error } = useFetch("/details/brand");

  return (
    <>
      {error ? (
        <h2>Что то пошло не так</h2>
      ) : loading ? (
        <h2>Загрузка</h2>
      ) : (
        <>
          <h2>Бренды</h2>
          <button onClick={() => setIsModalOpen(true)}>Добавить</button>
          <table className={style.table}>
            <thead>
              <tr className={style.row}>
                <th>id</th>
                <th>Название</th>
                <th>Значение</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((detail: any) => {
                return (
                  <tr key={detail.id} className={style.row}>
                    <td>{detail.id}</td>
                    <td>{detail.name}</td>
                    <td>{detail.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {isModalOpen && (
            <CreateBrand
              handleClose={() => setIsModalOpen(false)}
            ></CreateBrand>
          )}
        </>
      )}
    </>
  );
};
