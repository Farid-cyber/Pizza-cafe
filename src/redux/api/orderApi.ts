import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000` }),
  tagTypes: ["orders"],
  endpoints: (build) => ({
    getOrders: build.query({
      query: () => "/orders",
      providesTags: ["orders"],
    }),
    addOrder: build.mutation({
      query: (body) => ({
        url: `/orders`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useAddOrderMutation, useGetOrdersQuery } = orderApi;
