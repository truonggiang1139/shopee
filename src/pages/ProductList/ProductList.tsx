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
import { getCategories } from "src/apis/category.api";

export default function ProductList() {
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
  const { data: dataProducts } = useQuery({
    queryKey: ["products", queryConfig],
    queryFn: () => getProducts(queryConfig as IProductListConfig),
    keepPreviousData: true
  });
  const { data: dataCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories()
  });
  return (
    <div className="bg-[#f5f5fa] py-6">
      <div className="container">
        {dataProducts && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <AsideFilter queryConfig={queryConfig} categories={dataCategories?.data.data || []} />
            </div>
            <div className="col-span-9">
              <SortProductList queryConfig={queryConfig} pageSize={dataProducts.data.data.pagination.page_size} />
              <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {dataProducts.data.data.products.map((product) => (
                  <div className="col-span-1" key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={dataProducts.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
