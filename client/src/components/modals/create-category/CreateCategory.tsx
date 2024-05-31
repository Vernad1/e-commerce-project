import React, { useEffect, useState } from "react";
import style from "./createCategory.module.css";
import { IProductCategory } from "../../../models/IProductCategory";
import { useInput } from "../../../hooks/useInput";
import { addCategory } from "../../../service/api/adminApi";

interface ICreateCategoryProps {
  handleClose: Function;
  categories: IProductCategory[];
}

export const CreateCategory: React.FC<ICreateCategoryProps> = ({
  handleClose,
  categories,
}) => {
  const categoryName = useInput("", { minLength: 8, inputType: "text" });
  const [categoryId, setCategoryId] = useState<undefined | number>(undefined);

  const handleSubmitCategory = () => {
    if (!categoryName) {
      return;
    }
    addCategory({
      categoryName: categoryName.value,
      parentCategoryId: categoryId,
    });
  };

  return (
    <div className={style.modal} onClick={() => handleClose()}>
      <div onClick={(e) => e.stopPropagation()} className={style.modalContent}>
        <h1>CreateCategory</h1>
        <form>
          <div className={style.inputWrapper}>
            <label htmlFor="categoryName">Название:</label>
            <input
              className={style.input}
              name="categoryName"
              type="text"
              placeholder="Название"
              id="categoryName"
              value={categoryName.value}
              onChange={(e) => categoryName.onChange(e)}
              onBlur={categoryName.onBlur}
            ></input>
            {categoryName.isDirty && categoryName.isError && (
              <div className={style.emailError}>
                {categoryName.errorMessage}
              </div>
            )}
          </div>

          {
            <div className={style.inputWrapper}>
              <label htmlFor="adminCategory">
                Родительская категория (не обязательно):
              </label>
              <select
                id="adminCategory"
                defaultValue={0}
                className={style.select}
                value={categoryId ? categoryId : undefined}
                onChange={(e) => setCategoryId(Number(e.target.value))}
              >
                <option value={0} disabled={true}>
                  Выберите категорию
                </option>

                {categories?.map((category: IProductCategory) => {
                  if (!category.parentCategory)
                    return (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    );
                })}
              </select>
            </div>
          }
          <button onClick={handleSubmitCategory}>Добавить</button>
        </form>
      </div>
    </div>
  );
};
