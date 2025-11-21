import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://691c54f83aaeed735c906ecf.mockapi.io/`,
  }),
  tagTypes: ["orders"],
  endpoints: (build) => ({
    getOrders: build.query({
      query: () => "/orders",
      providesTags: ["orders"],
    }),
    getOrder: build.query({
      query: (id) => `/orders/${id}`,
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
    editOrder: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrders: build.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useEditOrderMutation,
  useAddOrderMutation,
  useGetOrdersQuery,
  useDeleteOrdersMutation,
  useGetOrderQuery,
} = orderApi;
