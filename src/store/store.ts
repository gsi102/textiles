import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { commonReducer } from "./reducers/commonSlice";
import { textilesAppAPI } from "../services/textilesAppService";

const initialState = {};

export const store = configureStore({
  reducer: {
    common: commonReducer,
    [textilesAppAPI.reducerPath]: textilesAppAPI.reducer,
  },
  preloadedState: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(textilesAppAPI.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
