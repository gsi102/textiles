import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../const/const";

export const textilesAppAPI = createApi({
  reducerPath: "spotifyAppAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token
    //   // If we have a token set in state, let's assume that we should be passing it.
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`)
    //   }
    //   headers.set("Access-Control-Allow-Origin", "*");
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<any, any>({
      query: ({}) => {
        return {
          url: `/products`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getProductItem: builder.query<any, any>({
      query: ({ id }) => {
        return {
          url: `/products/${id}`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductItemQuery,
  useLazyGetProductItemQuery,
} = textilesAppAPI;
export const { getProducts, getProductItem } = textilesAppAPI.endpoints;
