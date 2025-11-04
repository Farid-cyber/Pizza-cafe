import { configureStore } from "@reduxjs/toolkit";
// import useReducer from "./slices/productsSlice";
import useReducer3 from "./slices/productsSlice";
import useReducer2 from "./slices/catsSlice";
import useReducer4 from "./slices/ordersSlice";

import { productApi } from "./api/productApi";
import { catApi } from "./api/catApi";
import { orderApi } from "./api/orderApi";
// import { useReducer } from "react";

const store = configureStore({
  reducer: {
    products: useReducer3,
    categories: useReducer2,
    orders: useReducer4,
    [productApi.reducerPath]: productApi.reducer,
    [catApi.reducerPath]: catApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(catApi.middleware)
      .concat(orderApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
