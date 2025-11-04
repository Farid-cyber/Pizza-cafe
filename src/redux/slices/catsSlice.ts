import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../../types";

type State = {
  categories: Category[];
  categoryForm: {
    name: string;
  };
  editingId: string | null;
};

const initialState: State = {
  categories: [],
  categoryForm: {
    name: "",
  },
  editingId: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getForm: (
      state,
      action: PayloadAction<{
        key: string;
        value: string;
      }>
    ) => {
      state.categoryForm = {
        ...state.categoryForm,
        [action.payload.key]: action.payload.value,
      };
    },
    reset: (state) => {
      state.categoryForm = {
        ...state.categoryForm,
        name: "",
      };
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload
      );
    },
    editCategory: (state, action: PayloadAction<Category>) => {
      state.editingId = action.payload.id;
      state.categoryForm = {
        ...state.categoryForm,
        name: action.payload.name,
      };
    },
    setEditingIdCat: (state) => {
      state.editingId = null;
    },
  },
});

export const { getForm, reset, deleteCategory, editCategory, setEditingIdCat } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
