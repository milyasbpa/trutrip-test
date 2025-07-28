import {
  ProductsActionEnum,
  type ProductsActions,
  type ProductsFilters,
  type ProductsPagination,
} from "./Products.types";

// Filters
export const ProductsFiltersReducer = (
  state: ProductsFilters,
  action: ProductsActions
) => {
  switch (action.type) {
    case ProductsActionEnum.SetFiltersState:
      return action.payload;

    default:
      return state;
  }
};

// Pagination
export const ProductsPaginationReducer = (
  state: ProductsPagination,
  action: ProductsActions
) => {
  switch (action.type) {
    case ProductsActionEnum.SetPaginationState:
      return action.payload;

    default:
      return state;
  }
};
