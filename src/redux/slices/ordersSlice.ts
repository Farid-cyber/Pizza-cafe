import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../../types";

type State = {
  orderForm: {
    name: string;
    location: string;
    phonenumber: string;
  };
  editingId: number | null;
  orders: Order[];
};

const initialState: State = {
  orderForm: {
    name: "",
    location: "",
    phonenumber: "",
  },
  editingId: null,
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getForm: (
      state,
      action: PayloadAction<{
        key: string;
        value: string;
      }>
    ) => {
      state.orderForm = {
        ...state.orderForm,
        [action.payload.key]: action.payload.value,
      };
    },
    reset: (state) => {
      state.orderForm = {
        ...state.orderForm,
        name: "",
        location: "",
        phonenumber: "",
      };
    },
  },
});

export const {getForm, reset} = ordersSlice.actions;

export default ordersSlice.reducer;
