import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { CreateBrand } from "../../../components/modals/create-brand/CreateBrand";
import { IProductCategory } from "../../../models/IProductCategory";
import style from "./categoryTable.module.css";
import { CreateCategory } from "../../../components/modals/create-category/CreateCategory";

export const CategoryTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<IProductCategory[]>([]);

  const { data, loading, error } = useFetch("/product-category");

  useEffect(() => {
    setCategories(data);
  });

  return (
    <>
      {error ? (
        <h2>Что то пошло не так</h2>
      ) : loading ? (
        <h2>Загрузка</h2>
      ) : (
        <>
          <h2>Категории</h2>
          <button onClick={() => setIsModalOpen(true)}>Добавить</button>
          <table className={style.table}>
            <thead>
              <tr className={style.row}>
                <th>id</th>
                <th>Название</th>
                <th>Родительская категория</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((category: IProductCategory) => {
                return (
                  <tr key={category.id} className={style.row}>
                    <td>{category.id}</td>
                    <td>{category.categoryName}</td>
                    <td>
                      {category.parentCategory
                        ? category.parentCategory?.categoryName
                        : "Отсутсвует"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {isModalOpen && (
            <CreateCategory
              handleClose={() => setIsModalOpen(false)}
              categories={categories}
            ></CreateCategory>
          )}
        </>
      )}
    </>
  );
};
