import React, { FC, useCallback, useEffect, useState, useRef } from "react";
import { shallowEqual } from "react-redux";
import { PRODUCT_ABOUT } from "../../const/const";
import { setProductAbout } from "../../store/reducers/commonSlice";
import Preloader from "../UI/Preloader/Preloader";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import AboutMain from "./components/AboutMain/AboutMain";
import { v4 as uuid } from "uuid";

import styles from "./ProductAbout.module.scss";

const SECTIONS = [
  PRODUCT_ABOUT.SECTION_ONE,
  PRODUCT_ABOUT.SECTION_TWO,
  PRODUCT_ABOUT.SECTION_THREE,
];

const ProductAbout: FC = () => {
  const dispatch = useAppDispatch();
  const currentSection = useAppSelector(
    (state) => state.common.productAbout.currentSection
  );
  const isShow = useAppSelector((state) => state.common.productAbout.isShow);
  const fetchedProduct = useAppSelector(
    (state) => state.common.productAbout.product,
    shallowEqual
  );
  const [toggleAbout, setToggleAbout] = useState<string>(styles.aboutRemove);
  // const [isPreloader, setIsPreloader] = useState<boolean>(true);
  const isProductAboutFetched = Boolean(fetchedProduct.id !== 0);

  const keepTimeout = useRef<null | NodeJS.Timeout>();

  // Effects on choose section
  const chooseSection = useCallback((newActiveSection: string) => {
    dispatch(
      setProductAbout({ target: "currentSection", data: newActiveSection })
    );
  }, []);

  // Effects on close <ProductAbout />
  const closeAbout = useCallback(() => {
    dispatch(setProductAbout({ target: "isShow", data: false }));
  }, [keepTimeout.current]);

  // Effects on <ProductItem /> click
  useEffect(() => {
    if (isShow) {
      if (keepTimeout.current) {
        clearTimeout(keepTimeout.current);
      }
      setToggleAbout("");
      keepTimeout.current = setTimeout(() => {
        setToggleAbout(styles.aboutShow);
      }, 50);
    } else {
      if (keepTimeout.current) {
        clearTimeout(keepTimeout.current);
      }
      setToggleAbout("");
      keepTimeout.current = setTimeout(() => {
        setToggleAbout(styles.aboutRemove);
      }, 300);
    }
  }, [keepTimeout.current, isShow]);

  // Clean up
  useEffect(() => {
    return () => {
      if (keepTimeout.current) {
        clearTimeout(keepTimeout.current);
      }
      setToggleAbout(styles.aboutRemove);
      dispatch(
        setProductAbout({
          target: "currentSection",
          data: PRODUCT_ABOUT.SECTION_ONE,
        })
      );
    };
  }, [keepTimeout.current]);

  return (
    <div className={styles.about + " " + toggleAbout}>
      <div className={styles.about__closeBtn} onClick={closeAbout} />
      <div className={styles.about__sections}>
        {SECTIONS.map((section: string) => {
          let sectonStyle = styles.about__sections__item;
          if (section === currentSection) {
            sectonStyle += " " + styles.activeSection;
          }
          return (
            <div
              key={uuid()}
              className={sectonStyle}
              onClick={() => chooseSection(section)}
            >
              {section}
            </div>
          );
        })}
      </div>
      <hr />
      {!isProductAboutFetched && (
        <Preloader className={styles.about__preloader} />
      )}
      {isProductAboutFetched && (
        <AboutMain section={currentSection} product={fetchedProduct} />
      )}
    </div>
  );
};

export default ProductAbout;
