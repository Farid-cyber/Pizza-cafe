import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://68f11ffe0b966ad50035753d.mockapi.io/",
  }),
  tagTypes: ["products"],
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => "/products",
      providesTags: ["products"],
    }),

    getUsersByCategoryId: build.query({
      query: (searchvalue) => `/products?categoryId=${searchvalue.toString()}`,
      providesTags: ["products"],
    }),

    editUser: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["products"],
    }),

    addUser: build.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["products"],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useAddUserMutation,
  useGetUsersQuery,
  useEditUserMutation,
  useGetUsersByCategoryIdQuery,
} = productApi;
