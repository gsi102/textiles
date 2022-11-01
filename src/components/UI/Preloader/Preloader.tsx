import { useAppSelector } from "../../../hooks/useAppSelector";
import React, { FC, useEffect, useState } from "react";
import { THEMES_NAMES } from "../../../const/const";

import styles from "./Preloader.module.scss";
// import mainStyles from "../../styles/mainStyles.module.scss";

const Preloader: FC<any> = (props) => {
  const theme = useAppSelector((state) => state.common.theme);
  const [preloaderStyle, setPreloaderStyle] = useState<string>(
    styles.preloaderDark
  );

  useEffect(() => {
    if (theme === THEMES_NAMES.DAY) {
      setPreloaderStyle(styles.preloaderDark);
    } else {
      setPreloaderStyle(styles.preloaderLight);
    }
  }, [theme]);
  return (
    <div {...props} className={preloaderStyle + " " + props.className}>
      <img alt="preloader.gif" />
    </div>
  );
};

export default Preloader;
