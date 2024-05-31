import React from "react";
import style from "./createSize.module.css";
import { useInput } from "../../../hooks/useInput";
import { useParams } from "react-router-dom";
import { addSize } from "../../../service/api/adminApi";

interface ICreateSizeProps {
  handleClose: Function;
}

export const CreateSize: React.FC<ICreateSizeProps> = ({ handleClose }) => {
  const sizeNumber = useInput("", { minLength: 8, inputType: "text" });
  const quantity = useInput("", { minLength: 8, inputType: "text" });

  const productId = Number(useParams().productid);

  const handleSubmitSize = () => {
    if (!sizeNumber || !quantity || !productId) {
      return;
    }
    addSize({
      productId,
      sizeNumber: sizeNumber.value,
      quantity: quantity.value,
    });
  };

  return (
    <div className={style.modal} onClick={() => handleClose()}>
      <div onClick={(e) => e.stopPropagation()} className={style.modalContent}>
        <h1>Добавить размер</h1>
        <form>
          <div className={style.inputWrapper}>
            <label htmlFor="brandName">Размер:</label>
            <input
              className={style.input}
              name="brandName"
              type="text"
              placeholder="Размер"
              id="brandName"
              value={sizeNumber.value}
              onChange={(e) => sizeNumber.onChange(e)}
              onBlur={sizeNumber.onBlur}
            ></input>
            {sizeNumber.isDirty && sizeNumber.isError && (
              <div className={style.emailError}>{sizeNumber.errorMessage}</div>
            )}
          </div>

          <div className={style.inputWrapper}>
            <label htmlFor="quantity">Количество:</label>
            <input
              className={style.input}
              name="quantity"
              type="number"
              placeholder="Количество"
              id="quantity"
              value={quantity.value}
              onChange={(e) => quantity.onChange(e)}
              onBlur={quantity.onBlur}
            ></input>
            {quantity.isDirty && quantity.isError && (
              <div className={style.emailError}>{quantity.errorMessage}</div>
            )}
          </div>
          <button onClick={handleSubmitSize}>Добавить</button>
        </form>
      </div>
    </div>
  );
};
