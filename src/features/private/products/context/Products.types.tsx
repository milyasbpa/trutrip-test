type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface ProductsInitialStateType {
  filters: ProductsFilters;
  pagination: ProductsPagination;
}

// State Collection Types consist of:
export interface ProductsFilters {
  search: {
    value: string;
  };
  category: {
    selected: { id: number; name: string } | null;
  };
}

export interface ProductsPagination {
  limit: number;
  offset: number;
}

export enum ProductsActionEnum {
  SetFiltersState = "SetFiltersState",
  SetPaginationState = "SetPaginationState",
}

// Action Collection Types
export type ProductsActions =
  | ProductsFiltersActions
  | ProductsPaginationActions;

// Action Collection Types consist of:
// Filters
type ProductsFiltersPayload = {
  [ProductsActionEnum.SetFiltersState]: ProductsFilters;
};

export type ProductsFiltersActions =
  ActionMap<ProductsFiltersPayload>[keyof ActionMap<ProductsFiltersPayload>];

// Pagination
type ProductsPaginationPayload = {
  [ProductsActionEnum.SetPaginationState]: ProductsPagination;
};

export type ProductsPaginationActions =
  ActionMap<ProductsPaginationPayload>[keyof ActionMap<ProductsPaginationPayload>];
