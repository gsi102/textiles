import { createSlice } from "@reduxjs/toolkit";
import { ThemeType } from "../../types/types";
import { THEMES_NAMES } from "../../const/const";

let theme = localStorage.getItem("theme");
if (theme) theme = JSON.parse(theme);
else theme = THEMES_NAMES.DAY;

const initialState = {
  theme: theme as ThemeType,
  products: [],
  show: {
    products: [],
  },
} as { [key: string]: any };

export const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = [...action.payload.data];
      state.show.products = [...state.products];
    },
    setTheme: (state, action) => {
      state.theme = action.payload.data;
      localStorage.setItem("theme", action.payload.data);
    },
  },
});

export const { setProducts, setTheme } = commonSlice.actions;

export const commonReducer = commonSlice.reducer;
