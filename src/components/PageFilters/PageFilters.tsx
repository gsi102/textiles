import React, { FC, useCallback } from "react";
import { setPageFilters } from "../../store/reducers/commonSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ShowType, ProductsOnPageType } from "../../types/types";
import { v4 as uuid } from "uuid";

import styles from "./PageFilters.module.scss";
import mainStyles from "../../styles/mainStyles.module.scss";

const PRODUCTS_ON_PAGE_VALUES: ProductsOnPageType[] = [4, 6];
const SHOW_PRODUCTS_TYPES: ShowType[] = ["grid", "list"];

const PageFilters: FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.common.products);
  const productsPerPage = useAppSelector(
    (state) => state.common.pageFilters.productsPerPage
  );
  const currentPage = useAppSelector(
    (state) => state.common.pageFilters.currentPage
  );
  const currentShowType = useAppSelector(
    (state) => state.common.pageFilters.showType
  );

  const pagesAmount = Math.ceil(products.length / productsPerPage);
  const pagesArr = Array(pagesAmount).fill(null);

  const changePage = useCallback((pageNum: number) => {
    dispatch(setPageFilters({ target: "currentPage", data: pageNum }));
  }, []);

  const changeItemsOnPage = useCallback(
    (newQtyOnPage: number) => {
      if (productsPerPage !== newQtyOnPage) {
        const indexOfCurrentFirstElement =
          currentPage * productsPerPage - productsPerPage;

        // indexOfCurrentFirstElement = x * 4 - 4;
        // x = (indexOfCurrentFirstElement + newQtyOnPage) / newQtyOnPage
        const newCurrentPage = Math.floor(
          (indexOfCurrentFirstElement + newQtyOnPage) / newQtyOnPage
        );

        dispatch(
          setPageFilters({ target: "productsPerPage", data: newQtyOnPage })
        );
        dispatch(
          setPageFilters({ target: "currentPage", data: newCurrentPage })
        );
      }
    },
    [currentPage, productsPerPage]
  );

  const changeShowType = useCallback((showType: string) => {
    dispatch(setPageFilters({ target: "showType", data: showType }));
  }, []);

  return (
    <div className={styles.filters}>
      <div className={styles.filters__itemsAppear}>
        <div className={styles.filters__itemsAppear__show}>
          <span>Show as:</span>
          {SHOW_PRODUCTS_TYPES.map((el: string) => {
            let showTypeStyle = styles.filters__itemsAppear__show__type;
            if (el === "list") {
              showTypeStyle += " " + mainStyles.listIco;
            }
            if (el === "grid") {
              showTypeStyle += " " + mainStyles.gridIco;
            }
            if (currentShowType === el) {
              showTypeStyle += " " + styles.activeType;
            }
            return (
              <div
                key={uuid()}
                onClick={() => changeShowType(el)}
                className={showTypeStyle}
              />
            );
          })}
        </div>
        <div className={styles.filters__itemsAppear__onPage}>
          <span>Items on page:</span>
          {PRODUCTS_ON_PAGE_VALUES.map((el: number) => {
            let productsPerPageStyle = styles.filters__itemsAppear__onPage__qty;
            if (productsPerPage === el) {
              productsPerPageStyle += " " + styles.activeQty;
            }

            return (
              <div
                key={uuid()}
                className={productsPerPageStyle}
                onClick={() => changeItemsOnPage(el)}
              >
                {el}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.filters__pages}>
        {pagesArr.map((el: any, index: number) => {
          const pageNum = index + 1;
          let pageStyle = styles.filters__pageItem;
          if (currentPage === pageNum) {
            pageStyle += " " + styles.activePage;
          }

          return (
            <div
              key={uuid()}
              className={pageStyle}
              onClick={() => {
                changePage(pageNum);
              }}
            >
              {pageNum}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PageFilters;
