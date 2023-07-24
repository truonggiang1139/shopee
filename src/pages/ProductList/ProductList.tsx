import React, { useState } from "react";
import AsideFilter from "./AsideFilter";
import SortProductList from "./SortProductList";
import Product from "./Product";
import { useQuery } from "@tanstack/react-query";
import useQueryParams from "src/hooks/useQueryParams";
import { getProducts } from "src/apis/product.api";
import Pagination from "src/components/Pagination";
import { IProductListConfig, QueryConfigType } from "src/types/product.types";
import { isUndefined, omitBy } from "lodash";

export default function ProductList() {
  const [page, setPage] = useState(1);
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
      name: queryParams.name
    },
    isUndefined
  );
  const { data } = useQuery({
    queryKey: ["products", queryConfig],
    queryFn: () => getProducts(queryConfig as IProductListConfig),
    keepPreviousData: true
  });
  console.log(queryConfig);
  return (
    <div className="bg-[#f5f5fa] py-6">
      <div className="container">
        {data && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <AsideFilter />
            </div>
            <div className="col-span-9">
              <SortProductList queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
              <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {data.data.data.products.map((product) => (
                  <div className="col-span-1" key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
