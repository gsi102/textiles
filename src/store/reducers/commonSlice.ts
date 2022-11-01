import { createSlice } from "@reduxjs/toolkit";
import {
  ThemeType,
  ShowType,
  ProductsOnPageType,
  ProductSectionType,
  IProductFull,
} from "../../types/types";
import { THEMES_NAMES, SHOW_PRODUCTS_AS } from "../../const/const";

let theme = localStorage.getItem("theme");
if (theme) theme = JSON.parse(theme);
else theme = THEMES_NAMES.DAY;

const initialState = {
  theme: theme as ThemeType,
  pageFilters: {
    showType: SHOW_PRODUCTS_AS.GRID as ShowType,
    productsPerPage: 4 as ProductsOnPageType,
    currentPage: 1,
  } as { [key: string]: any },
  products: [],
  show: {
    products: [],
  },
  productAbout: {
    isShow: false,
    currentSection: "Textiles" as ProductSectionType,
    product: {
      desc: "",
      id: 0,
      img: "",
      name: "",
      rules: [],
      suppliers: [],
      textiles: [],
    } as IProductFull,
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
    setPageFilters: (state, action) => {
      const target = action.payload.target;
      state.pageFilters[target] = action.payload.data;
    },
    setProductAbout: (state, action) => {
      const target = action.payload.target;
      const typeOfData = typeof action.payload.data;

      if (typeOfData === "object" && typeOfData !== null) {
        state.productAbout[target] = { ...action.payload.data };
      } else {
        state.productAbout[target] = action.payload.data;
      }
    },
  },
});

export const { setProducts, setTheme, setPageFilters, setProductAbout } =
  commonSlice.actions;

export const commonReducer = commonSlice.reducer;
