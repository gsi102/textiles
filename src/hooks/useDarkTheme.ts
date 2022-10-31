import { useState, useEffect } from "react";
import { useAppSelector } from "./useAppSelector";
import { THEMES_NAMES } from "../const/const";

import mainStyles from "../styles/mainStyles.module.scss";

const [DAY, NIGHT] = [THEMES_NAMES.DAY, THEMES_NAMES.NIGHT];

export function useDarkTheme() {
  const currentTheme = useAppSelector((state) => state.common.theme);
  const [dark, setDark] = useState("");
  const [noDark, setNoDark] = useState("");

  useEffect(() => {
    if (currentTheme === NIGHT) {
      setDark(mainStyles.darkTheme);
      setNoDark(mainStyles.noChangeTheme);
    }
    if (currentTheme === DAY) {
      setDark("");
      setNoDark("");
    }
  }, [currentTheme]);

  return { dark, noDark };
}
