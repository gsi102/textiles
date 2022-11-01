import React, { FC, useCallback, useEffect, useState } from "react";
import { useDarkTheme } from "../../hooks/useDarkTheme";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { THEMES_NAMES } from "../../const/const";
import { setTheme } from "../../store/reducers/commonSlice";

import styles from "./Header.module.scss";

const Header: FC = () => {
  const { noDark } = useDarkTheme();
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.common.theme);
  const [handlerStyle, setHandlerStyle] = useState<string>("");

  const onChangeTheme = useCallback(() => {
    if (currentTheme === THEMES_NAMES.DAY) {
      dispatch(setTheme({ data: THEMES_NAMES.NIGHT }));
      localStorage.setItem("theme", JSON.stringify(THEMES_NAMES.NIGHT));
    }

    if (currentTheme === THEMES_NAMES.NIGHT) {
      dispatch(setTheme({ data: THEMES_NAMES.DAY }));
      localStorage.setItem("theme", JSON.stringify(THEMES_NAMES.DAY));
    }
  }, [currentTheme]);

  useEffect(() => {
    if (currentTheme === THEMES_NAMES.DAY) {
      setHandlerStyle("");
    } else {
      setHandlerStyle(styles.activeToggle);
    }
  }, [currentTheme]);

  return (
    <header className={styles.header}>
      <div className={styles.header__logoWrapper + " " + noDark}>
        <img alt="logo.png" />
      </div>
      <div className={styles.header__changeTheme}>
        <span>Dark mode: </span>
        <div
          className={styles.header__changeTheme__handler}
          onClick={onChangeTheme}
        >
          <div
            className={
              styles.header__changeTheme__handler__toggle + " " + handlerStyle
            }
          ></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
