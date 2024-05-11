import { useRef, useState } from "react";
import { Layout } from "../../components/appLayout/Layout";
import style from "./products.module.css";
import { ProductList } from "./product-list/ProductList";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { IProductCategory } from "../../models/IProductCategory";
import { IFilterProduct } from "../../models/IFilterProduct";

// TODO media query

export const Products = () => {
  const [maxPrice, setMaxPrice] = useState("1000");
  const [sort, setSort] = useState<null | string>(null);
  const [filters, setFilters] = useState<IFilterProduct[]>([]);

  const { data, loading, error } = useFetch("/product-category");
  const details = useFetch("/details");

  const catId = Number(useParams().id);

  function handleChangeCategory(e: any) {
    const isCheked = e.target.checked;
    const value = e.target.value;
    setFilters((prev) =>
      isCheked
        ? [...prev, { name: "категории", value }]
        : prev.filter((item) => item.value != value)
    );
  }

  return (
    <Layout>
      <div className={style.container}>
        <div className={style.left}>
          <div className={style.filterItem}>
            <h2>Категории</h2>

            {error
              ? "Что то пошло не так"
              : loading
              ? "Загрузка"
              : data?.map((category: IProductCategory) => {
                  return (
                    <div key={category.id} className={style.inputItem}>
                      <input
                        type="checkbox"
                        id={String(category.id)}
                        value={category.categoryName}
                        onChange={(e) => handleChangeCategory(e)}
                      ></input>
                      <label htmlFor={String(category.id)}>
                        {category.categoryName}
                      </label>
                    </div>
                  );
                })}
          </div>
          <div className={style.filterItem}>
            <h2>Цена</h2>
            <div className={style.inputItem}>
              <span>0</span>
              <input
                className={style.rangeInput}
                type="range"
                min={0}
                max={20000}
                onChange={(e) => setMaxPrice(e.target.value)}
              ></input>
              <span>{maxPrice}</span>
            </div>
          </div>

          <div className={style.filterItem}>
            <h2>Сортировать по:</h2>
            <div className={style.inputItem}>
              <input
                type="radio"
                id="asc"
                value="asc"
                name="price"
                onChange={(e) => setSort(e.target.value)}
              ></input>
              <label htmlFor="asc">Цена: сначала ниже</label>
            </div>
            <div className={style.inputItem}>
              <input
                type="radio"
                id="desc"
                value="desc"
                name="price"
                onChange={(e) => setSort(e.target.value)}
              ></input>
              <label htmlFor="desc">Цена: сначала выше</label>
            </div>
          </div>
        </div>
        <div className={style.right}>
          <ProductList
            catId={catId}
            maxPrice={maxPrice}
            sort={sort}
            filters={filters}
          ></ProductList>
        </div>
      </div>
    </Layout>
  );
};
