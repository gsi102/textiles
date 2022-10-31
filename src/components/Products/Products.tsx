import React, { FC, useEffect } from "react";
import ProductItem from "./components/ProductItem/ProductItem";

import styles from "./Products.module.scss";

const Products: FC = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <ProductItem />
    </div>
  );
};

export default Products;
