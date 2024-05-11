import React from "react";
import { Link } from "react-router-dom";
import style from "./card.module.css";
import { IProduct } from "../../../models/IProduct";

interface cardProps {
  cardInfo: IProduct;
}

export const Card: React.FC<cardProps> = ({ cardInfo }) => {
  return (
    <div className={style.card}>
      <Link className={style.link} to={`/product/${cardInfo.id}`}>
        <div className={style.image}>
          <img
            src={import.meta.env.VITE_API_URL + cardInfo.ProductImage[0].image}
          ></img>
        </div>
      </Link>

      <span>{cardInfo.name}</span>
      <div>
        <span>{cardInfo.price + " ₽"}</span>
      </div>
    </div>
  );
};
