import React, { useEffect, useState } from "react";
import style from "./createCategory.module.css";

interface ICreateCategoryProps {
  handleClose: Function;
}

export const CreateCategory: React.FC<ICreateCategoryProps> = ({
  handleClose,
}) => {
  const [categories, setCategories] = useState([]);

  function fetchCategories() {
    fetch("http://localhost:5000/product-category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }

  console.log(categories);
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={style.modal} onClick={() => handleClose()}>
      <div onClick={(e) => e.stopPropagation()} className={style.modalContent}>
        <h1>CreateCategory</h1>
        <ul>
          {categories.map((category: any) => {
            return (
              <li
                style={{ display: "flex", marginBottom: "10px" }}
                key={category.id}
              >
                <button>{category?.categoryName}</button>
                {category?.parentCategory ? (
                  <div>
                    {"Родитель: " + category?.parentCategory.categoryName}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
