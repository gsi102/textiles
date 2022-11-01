import React, { FC, useCallback } from "react";
import { IProductShort } from "../../../../types/types";
import { SERVER } from "../../../../const/const";
import { useDarkTheme } from "../../../../hooks/useDarkTheme";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { setProductAbout } from "../../../../store/reducers/commonSlice";
import { useLazyGetProductItemQuery } from "../../../../services/textilesAppService";
import { IProductFull } from "../../../../types/types";

import styles from "./ProductItem.module.scss";

interface Props {
  product: IProductShort;
}

const ProductItem: FC<Props> = (props) => {
  const { product } = props;
  const dispatch = useAppDispatch();
  const { noDark } = useDarkTheme();
  const isShowAbout = useAppSelector(
    (state) => state.common.productAbout.isShow
  );
  const [lazyGetProductItemQuery] = useLazyGetProductItemQuery();

  const showAboutProduct = useCallback(
    (id: number | string) => {
      if (!isShowAbout) {
        dispatch(setProductAbout({ target: "isShow", data: true }));
      }

      lazyGetProductItemQuery({ id })
        .unwrap()
        .then((res: IProductFull) => {
          const newProductAbout = { ...res };
          dispatch(
            setProductAbout({ target: "product", data: newProductAbout })
          );
        })
        .catch((e) => console.error(e));
    },
    [isShowAbout]
  );

  return (
    <div
      className={styles.products__item}
      onClick={() => showAboutProduct(product.id)}
    >
      <div className={styles.product__img}>
        <img
          className={noDark}
          src={`${SERVER}` + `${product.img}`}
          alt="product-img.png"
        />
      </div>
      <div className={styles.product__description}>
        <div className={styles.product__description__name}>
          <p>{product.name}</p>
        </div>
        <div className={styles.product__description__desc}>
          <p>{product.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
