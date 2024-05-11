import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/appLayout/Layout";
import style from "./product.module.css";
import useFetch from "../../hooks/useFetch";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addToUserCart } from "../../store/reducers/cart/ActionCreators";
import { addUnAuth } from "../../store/reducers/cart/CartSlice";

export const Product = () => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedProduct, setSelecteProduct] = useState<null | any>(null);

  const dispacth = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const id = useParams().id;

  const { data, loading, error } = useFetch(`/product/${id}`);

  const variation = data?.ProductItems?.map((item: any) => {
    const currentItem = item?.configuration.find(
      (variant: any) => variant.variation.name == "Размер"
    );
    return currentItem.value;
  });

  console.log(selectedProduct);

  function handleVariation(value: any) {
    setSelecteProduct(
      data?.ProductItems?.find((product: any) => {
        return product?.configuration.find((conf: any) => conf.value == value);
      })
    );
  }

  function isSelectdValue(value: any) {
    const currentProduct = selectedProduct?.configuration.find((conf: any) => {
      return conf.value === String(value);
    });
    if (currentProduct) {
      return true;
    } else {
      return false;
    }
  }

  function handleAddToCart() {
    user?.id
      ? dispacth(
          addToUserCart({
            userId: user?.id,
            productItemId: selectedProduct.id,
          })
        )
      : dispacth(addUnAuth(selectedProduct));
  }

  return (
    <Layout>
      <div className={style.container}>
        {error ? (
          "Что то пошло не так"
        ) : loading ? (
          "Загрузка"
        ) : (
          <>
            <div className={style.left}>
              <div className={style.images}>
                {data?.ProductImage?.map((image: any, index: number) => {
                  return (
                    <img
                      key={image.id}
                      src={import.meta.env.VITE_API_URL + image.image}
                      onClick={() => setSelectedImg(index)}
                    ></img>
                  );
                })}
              </div>
              <div className={style.mainImage}>
                <img
                  src={
                    import.meta.env.VITE_API_URL +
                    data?.ProductImage[selectedImg].image
                  }
                  alt=""
                  onClick={() =>
                    setSelectedImg(
                      (prev) => (prev + 1) % data?.ProductImage?.length
                    )
                  }
                />
              </div>
            </div>
            <div className={style.right}>
              <h1 className={style.title}>{data?.name}</h1>
              <span className={style.price}>{data?.price + " ₽"} </span>

              <div className={style.variation}>
                {variation?.map((item: any) => {
                  return (
                    <div
                      onClick={() => handleVariation(item)}
                      key={item}
                      className={
                        isSelectdValue(item)
                          ? style.variationItem + " " + style.active
                          : style.variationItem
                      }
                    >
                      {item.toUpperCase()}
                    </div>
                  );
                })}
              </div>
              <button
                disabled={selectedProduct === null}
                className={style.buyButton}
                onClick={() => handleAddToCart()}
              >
                Добавить в корзину
              </button>
              <div className={style.descrition}>
                <p className={style.descritionText}>{data?.description}</p>
                <div className={style.details}>
                  {data?.productDescription?.map((item: any) => {
                    return (
                      <div className={style.detailItem} key={item.id}>
                        {"- " + item.value}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};
