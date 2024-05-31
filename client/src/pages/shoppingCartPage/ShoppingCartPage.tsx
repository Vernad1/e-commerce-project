import React, { useEffect, useState } from "react";
import { Layout } from "../../components/appLayout/Layout";
import style from "./shoppingCartPage.module.css";
import { CartTable } from "./cart-table/CartTable";
import { useAppSelector } from "../../hooks/redux";

export const ShoppingCartPage = () => {
  const products = useAppSelector((state) => state.cart.shoppingCartItems);

  const [price, setPrice] = useState(0);

  useEffect(() => {
    let currentPrice = 0;
    products.map((item) => {
      if (item.product) {
        currentPrice += item.quantityInCart * item.product?.price;
      }
      if (item.productItem.product) {
        currentPrice += item.quantityInCart * item.productItem.product.price;
      }
    });
    setPrice(currentPrice);
  }, [products]);

  return (
    <Layout>
      <div className={style.container}>
        <h1 className={style.title}>Ваша корзина</h1>
        <div className={style.content}>
          <div className={style.left}>
            <CartTable></CartTable>
          </div>
          <div className={style.right}>
            <div className={style.order}>
              <h2 className={style.orderTitle}>Сумма заказа</h2>
              <div className={style.orderInfo}>
                <div className={style.info}>
                  <p className={style.infoName}>Доставка</p>
                  <p className={style.infoValue}>Бесплатно</p>
                </div>
              </div>
              <div className={style.total}>
                <p className={style.totalTitle}>Всего</p>
                <p className={style.totalValue}>{price}</p>
              </div>
              <button className={style.orderButton}>Оформить</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
