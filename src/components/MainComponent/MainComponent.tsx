import React, { FC } from "react";
import Products from "../Products/Products";

import styles from "./MainComponent.module.scss";

const MainComponent: FC = () => {
  return (
    <div>
      <Products />
    </div>
  );
};

export default MainComponent;
