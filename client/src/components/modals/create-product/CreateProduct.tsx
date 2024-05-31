import React, { useState } from "react";
import style from "./createProduct.module.css";
import { useInput } from "../../../hooks/useInput";
import useFetch from "../../../hooks/useFetch";
import { IProductCategory } from "../../../models/IProductCategory";
import { addProduct } from "../../../service/api/adminApi";

interface ICreateProductProps {
  handleClose: Function;
}

export const CreateProduct: React.FC<ICreateProductProps> = ({
  handleClose,
}) => {
  // Два? поля Details обязательных, при необходимости можно добавить во вкладке детали и другие поля
  const brandName = "Бренд";
  const colorName = "Цвет";

  const name = useInput("", { minLength: 8, inputType: "text" });
  const description = useInput("", { minLength: 8, inputType: "text" });
  const price = useInput("", { minLength: 8, inputType: "text" });

  const [categoryId, setCategoryId] = useState<undefined | string>(undefined);
  const [image, setImage] = useState({});
  const [details, setDetails] = useState<
    { name: string; value: string; id: number }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { data, loading, error } = useFetch("/product-category");
  const brand = useFetch("/details/brand");
  const color = useFetch("/details/color");

  const changeDetails = (name: string, value: string) => {
    setDetails((prev) => prev.filter((item) => item.name != name));
    setDetails((prev) => [...prev, { id: Date.now(), name, value }]);
  };

  const selectImage = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleAddProduct = async (e: any) => {
    e.preventDefault();
    if (!categoryId || details.length < 2) {
      setErrorMessage("Заполните все поля!");
    } else {
      const product = await addProduct({
        categoryId: categoryId,
        description: description.value,
        details: details,
        image,
        name: name.value,
        price: price.value,
      })
        .then(handleClose())
        .catch((e) => setErrorMessage(e.message));
    }
  };

  return (
    <div className={style.modal} onClick={() => handleClose()}>
      <div onClick={(e) => e.stopPropagation()} className={style.modalContent}>
        <h1>CreateProduct</h1>
        <form>
          <div className={style.formInner}>
            <div className={style.left}>
              <div className={style.inputWrapper}>
                <label htmlFor="name">Название:</label>
                <input
                  className={style.input}
                  name="name"
                  type="text"
                  placeholder="Название"
                  id="name"
                  value={name.value}
                  onChange={(e) => name.onChange(e)}
                  onBlur={name.onBlur}
                ></input>
                {name.isDirty && name.isError && (
                  <div className={style.emailError}>{name.errorMessage}</div>
                )}
              </div>

              <div className={style.inputWrapper}>
                <label htmlFor="description">Описание:</label>
                <input
                  className={style.input}
                  name="description"
                  type="text"
                  placeholder="Описание"
                  id="description"
                  value={description.value}
                  onChange={(e) => description.onChange(e)}
                  onBlur={description.onBlur}
                ></input>
                {description.isDirty && description.isError && (
                  <div className={style.emailError}>
                    {description.errorMessage}
                  </div>
                )}
              </div>

              <div className={style.inputWrapper}>
                <label htmlFor="price">Цена:</label>
                <input
                  className={style.input}
                  name="price"
                  type="text"
                  placeholder="Цена"
                  id="price"
                  value={price.value}
                  onChange={(e) => price.onChange(e)}
                  onBlur={price.onBlur}
                ></input>
                {price.isDirty && price.isError && (
                  <div className={style.emailError}>{price.errorMessage}</div>
                )}
              </div>

              {error ? (
                <h2>Что то пошло не так</h2>
              ) : loading ? (
                <h2>Загрузка</h2>
              ) : (
                <div className={style.inputWrapper}>
                  <label htmlFor="category">Категория:</label>
                  <select
                    id="category"
                    defaultValue={0}
                    className={style.select}
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value={0} disabled={true}>
                      Выберите категорию
                    </option>

                    {data?.map((category: IProductCategory) => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.categoryName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
            </div>
            <div className={style.right}>
              {brand.error ? (
                <h2>Что то пошло не так</h2>
              ) : brand.loading ? (
                <h2>Загрузка</h2>
              ) : (
                <div className={style.inputWrapper}>
                  <label htmlFor="category">Бренд:</label>
                  <select
                    id="category"
                    defaultValue={0}
                    className={style.select}
                    onChange={(e) => changeDetails(brandName, e.target.value)}
                  >
                    <option value={0} disabled={true}>
                      Выберите бренд
                    </option>

                    {brand.data?.map(
                      (brand: { id: number; name: string; value: string }) => {
                        return (
                          <option key={brand.id} value={brand.value}>
                            {brand.value}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>
              )}

              {color.error ? (
                <h2>Что то пошло не так</h2>
              ) : color.loading ? (
                <h2>Загрузка</h2>
              ) : (
                <div className={style.inputWrapper}>
                  <label htmlFor="category">Цвет:</label>
                  <select
                    id="category"
                    defaultValue={0}
                    className={style.select}
                    onChange={(e) => changeDetails(colorName, e.target.value)}
                  >
                    <option value={0} disabled={true}>
                      Выберите цвет
                    </option>

                    {color.data?.map(
                      (color: { id: number; name: string; value: string }) => {
                        return (
                          <option key={color.id} value={color.value}>
                            {color.value}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>
              )}

              <div className={style.inputWrapper}>
                <label htmlFor="image">Изображение:</label>
                <input
                  className={style.input}
                  name="image"
                  type="file"
                  placeholder="Фотография"
                  id="image"
                  onChange={selectImage}
                ></input>
              </div>
            </div>
          </div>
          {errorMessage && <h2 style={{ color: "red" }}>{errorMessage}</h2>}
          <button onClick={(e) => handleAddProduct(e)}>Добавить товар</button>
        </form>
      </div>
    </div>
  );
};
