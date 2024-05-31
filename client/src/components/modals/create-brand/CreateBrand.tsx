import React from "react";
import style from "./createBrand.module.css";
import { useInput } from "../../../hooks/useInput";
import { addBrand } from "../../../service/api/adminApi";

interface ICreateBrandProps {
  handleClose: Function;
}

export const CreateBrand: React.FC<ICreateBrandProps> = ({ handleClose }) => {
  const brandName = useInput("", { minLength: 8, inputType: "text" });

  const handleSubmitBrand = () => {
    if (!brandName) {
      return;
    }
    addBrand(brandName.value);
  };

  return (
    <div className={style.modal} onClick={() => handleClose()}>
      <div onClick={(e) => e.stopPropagation()} className={style.modalContent}>
        <h1>Добавить бренд</h1>
        <form>
          <div className={style.inputWrapper}>
            <label htmlFor="brandName">Название:</label>
            <input
              className={style.input}
              name="brandName"
              type="text"
              placeholder="Название"
              id="brandName"
              value={brandName.value}
              onChange={(e) => brandName.onChange(e)}
              onBlur={brandName.onBlur}
            ></input>
            {brandName.isDirty && brandName.isError && (
              <div className={style.emailError}>{brandName.errorMessage}</div>
            )}
          </div>
          <button onClick={handleSubmitBrand}>Добавить</button>
        </form>
      </div>
    </div>
  );
};
