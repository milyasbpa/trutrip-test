import type { ProductsInitialStateType } from "./Products.types";

export const initialState: ProductsInitialStateType = {
  filters: {
    search: {
      value: "",
    },
    category: {
      selected: null,
    },
  },
  pagination: {
    limit: 12,
    offset: 0,
  },
};
