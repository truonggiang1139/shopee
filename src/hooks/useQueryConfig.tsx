import { omitBy, isUndefined } from "lodash";
import { QueryConfigType } from "src/types/product.types";
import useQueryParams from "./useQueryParams";

export default function useQueryConfig() {
  const queryParams: QueryConfigType = useQueryParams();
  const queryConfig: QueryConfigType = omitBy(
    {
      page: queryParams.page || "1",
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      exclude: queryParams.exclude,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name,
      category: queryParams.category
    },
    isUndefined
  );
  return queryConfig;
}
