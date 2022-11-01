import ProductAbout from "../ProductAbout/ProductAbout";
import React, { FC } from "react";
import Products from "../Products/Products";
import PageFilters from "../PageFilters/PageFilters";
import Header from "../Header/Header";
import { useDarkTheme } from "../../hooks/useDarkTheme";

import styles from "./MainComponent.module.scss";

const MainComponent: FC = () => {
  const { dark } = useDarkTheme();

  return (
    <div className={styles.main + " " + dark}>
      <Header />
      <PageFilters />
      <Products />
      <ProductAbout />
    </div>
  );
};

export default MainComponent;
