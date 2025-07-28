import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductsReactQueryKey } from "../keys";
import type {
  GetCategoriesRequestInterface,
  GetCategoriesResponseInterface,
} from "@/core/types/api";
import { ENVIRONMENT } from "@/core/utils/constants";

const fetchCategories = async (payload?: GetCategoriesRequestInterface) => {
  const res = await axios.get(`${ENVIRONMENT.API_URL}/categories`, {
    params: payload?.params,
  });
  return res.data;
};

export const useGetCategories = () => {
  return useQuery<GetCategoriesResponseInterface[]>({
    queryKey: ProductsReactQueryKey.getCategories(),
    queryFn: () => fetchCategories(),
  });
};
