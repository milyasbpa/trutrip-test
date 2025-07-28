import type {
  GetCategoriesRequestInterface,
  GetProductsRequestInterface,
} from "@/core/types/api";

export const ProductsReactQueryKey = {
  getProducts: (payload?: GetProductsRequestInterface) => {
    return ["useGetProducts", [payload] as const];
  },
  getCategories: (payload?: GetCategoriesRequestInterface) => {
    return ["useGetCategories", [payload] as const];
  },
};
