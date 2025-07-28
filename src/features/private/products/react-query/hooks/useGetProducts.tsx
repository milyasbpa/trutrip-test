import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useMemo } from "react";

import { useDebounceValue } from "usehooks-ts";
import { ProductsContext } from "../../context";
import { ProductsReactQueryKey } from "../keys";
import type {
  GetProductsRequestInterface,
  GetProductsResponseInterface,
} from "@/core/types/api";
import { ENVIRONMENT, PAGINATION } from "@/core/utils/constants";
import { useSearchParams } from "react-router";

const fetchProducts = async (payload?: GetProductsRequestInterface) => {
  const res = await axios.get(`${ENVIRONMENT.API_URL}/products`, {
    params: payload?.params,
  });
  return res.data;
};

export const useGetProducts = () => {
  const { state: productsState } = useContext(ProductsContext);
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const categoryValue = searchParams.get("category") || "";
  const offsetValue = searchParams.get("offset") || "";
  const [debouncedSearch] = useDebounceValue(searchValue, 500);

  const payload: GetProductsRequestInterface = useMemo(() => {
    return {
      params: {
        title: debouncedSearch.length ? debouncedSearch : undefined,
        categoryId:
          categoryValue.length && !isNaN(Number(categoryValue))
            ? Number(categoryValue)
            : undefined,
        // offset: productsState.pagination.offset,
        offset:
          offsetValue.length && !isNaN(Number(offsetValue))
            ? Number(offsetValue)
            : 0,
        limit: PAGINATION.LIMIT,
      },
    };
  }, [
    debouncedSearch,
    categoryValue,
    offsetValue,
    // productsState.pagination.offset,
    PAGINATION.LIMIT,
  ]);

  return useQuery<GetProductsResponseInterface[]>({
    queryKey: ProductsReactQueryKey.getProducts(payload),
    queryFn: () => fetchProducts(payload),
  });
};
