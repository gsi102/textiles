import React, { FC, useCallback, useEffect, useState } from "react";
import ProductItem from "./components/ProductItem/ProductItem";
import { useLazyGetProductsQuery } from "../../services/textilesAppService";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setProducts } from "../../store/reducers/commonSlice";
import { IProductShort } from "../../types/types";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setProductAbout } from "../../store/reducers/commonSlice";
import { v4 as uuid } from "uuid";
import { SHOW_PRODUCTS_AS } from "../../const/const";

import styles from "./Products.module.scss";

const Products: FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.common.show.products);
  const productsPerPage = useAppSelector(
    (state) => state.common.pageFilters.productsPerPage
  );
  const currentPage = useAppSelector(
    (state) => state.common.pageFilters.currentPage
  );
  const currentShowType = useAppSelector(
    (state) => state.common.pageFilters.showType
  );

  const [productsGroupBy, setProductsGroupBy] = useState<string>(styles.byGrid);
  const [productsShow, setProductsShow] = useState<string>(styles.bySix);
  const [productsOnPage, setProductsOnPage] = useState<IProductShort[]>([
    ...products,
  ]);
  const [lazyGetProductsQuery] = useLazyGetProductsQuery();

  // Styling Products appearance (grid/list)
  useEffect(() => {
    if (currentShowType === SHOW_PRODUCTS_AS.GRID) {
      setProductsGroupBy(styles.byGrid);
    }
    if (currentShowType === SHOW_PRODUCTS_AS.LIST) {
      setProductsGroupBy(styles.byList);
    }
  }, [currentShowType]);

  // Styling Products per page appearance (4/6)
  useEffect(() => {
    if (productsPerPage === 6) {
      setProductsShow(styles.bySix);
    }
    if (productsPerPage === 4) {
      setProductsShow(styles.byFour);
    }
  }, [currentPage, products, productsPerPage]);

  // Showing products on the page depends on productsPerPage and currentPage
  useEffect(() => {
    if (products.length !== 0) {
      const startIndex = currentPage * productsPerPage - productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const tempArr = products.slice(startIndex, endIndex);
      setProductsOnPage([...tempArr]);
    }
  }, [currentPage, products, productsPerPage]);

  // Get all products from DB without limit
  useEffect(() => {
    lazyGetProductsQuery({})
      .unwrap()
      .then((res: IProductShort[]) => {
        dispatch(setProducts({ data: res }));
      })
      .catch((e) => console.error(e));

    return () => {
      dispatch(setProductAbout({ target: "isShow", data: false }));
    };
  }, []);

  return (
    <div
      className={
        `${styles.products}` + ` ${productsGroupBy}` + ` ${productsShow}`
      }
    >
      {productsOnPage.map((productItem: IProductShort) => {
        return (
          <div key={uuid()}>
            <ProductItem product={productItem} />
          </div>
        );
      })}
    </div>
  );
};

export default Products;
