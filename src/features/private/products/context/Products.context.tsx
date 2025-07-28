import React, { createContext, useReducer, type Dispatch } from "react";
import {
  type ProductsActions,
  type ProductsInitialStateType,
} from "./Products.types";
import {
  ProductsFiltersReducer,
  ProductsPaginationReducer,
} from "./Products.reducers";
import { initialState } from "./Products.data";

const ProductsContext = createContext<{
  state: ProductsInitialStateType;
  dispatch: Dispatch<ProductsActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { filters, pagination }: ProductsInitialStateType,
  action: ProductsActions
) => ({
  filters: ProductsFiltersReducer(filters, action),
  pagination: ProductsPaginationReducer(pagination, action),
});

const ProductsProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider, ProductsContext };
