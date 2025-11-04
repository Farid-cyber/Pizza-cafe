import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order, Product } from "../../types";

type State = {
  users: Product[];
  productForm: {
    title: string;
    price: string;
    types: string[];
    sizes: string[];
    imageUrl: string;
    categoryId: string;
  };
  editingId: number | null;
  orders: Order[];
};

const initialState: State = {
  users: [],
  productForm: {
    title: "",
    price: "",
    types: [],
    sizes: [],
    imageUrl: "",
    categoryId: "0",
  },
  editingId: null,
  orders: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    handleSaveProduct: (state, action: PayloadAction<Product>) => {
      if (state.editingId === null) {
        state.users.push(action.payload);
        console.log(state.users);
      } else {
        const currentIndex = state.users.findIndex(
          (user) => user.id === state.editingId
        );
        console.log(currentIndex);
        state.users[currentIndex] = action.payload;
        state.editingId = null;
        console.log(state.editingId);
      }
    },
    getForm: (
      state,
      action: PayloadAction<{
        key: string;
        value: string;
      }>
    ) => {
      state.productForm = {
        ...state.productForm,
        [action.payload.key]: action.payload.value,
      };
    },
    reset: (state) => {
      state.productForm = {
        ...state.productForm,
        title: "",
        price: "",
        types: [],
        sizes: [],
        imageUrl: "",
        categoryId: "0",
      };
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((c) => c.id !== action.payload);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      state.editingId = action.payload.id;
      state.productForm = {
        ...state.productForm,
        title: action.payload.title,
        imageUrl: action.payload.imageUrl,
        price: action.payload.price,
        types: action.payload.types,
        sizes: action.payload.sizes,
        categoryId: action.payload.categoryId,
      };
    },
    setEditingId: (state) => {
      state.editingId = null;
    },
    getOrders: (state) => {
      state.orders = JSON.parse(localStorage.getItem("orders") || "[]");
    },
    addToOrders: (state, action: PayloadAction<Product>) => {
      state.orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const existing = state.orders.find((c) => c.id == action.payload.id);
      if (existing) {
        existing.quantity += 1;
        localStorage.setItem("orders", JSON.stringify(state.orders));
        return;
      }
      state.orders.push({ ...action.payload, quantity: 1 });
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
});

export const {
  handleSaveProduct,
  getForm,
  reset,
  deleteProduct,
  editProduct,
  setEditingId,
  addToOrders,
  getOrders,
} = productsSlice.actions;

export default productsSlice.reducer;
