import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const catApi = createApi({
  reducerPath: "catApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://68f11ffe0b966ad50035753d.mockapi.io/`,
  }),
  tagTypes: ["categories"],
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => `/categories`,
      providesTags: ["categories"],
    }),
    addCategory: build.mutation({
      query: (body) => ({
        url: `/categories`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["categories"],
    }),
    deleteCategory: build.mutation({
      query: (id: string) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
    editCategory: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useDeleteCategoryMutation,
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useEditCategoryMutation,
} = catApi;
