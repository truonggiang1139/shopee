import React from "react";
import AsideFilter from "./AsideFilter";
import SortProductList from "./SortProductList";
import Product from "./Product";
import { useQuery } from "@tanstack/react-query";
import useQueryParams from "src/hooks/useQueryParams";
import { getProducts } from "src/apis/product.api";

export default function ProductList() {
  const queryParams = useQueryParams();
  const { data } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => getProducts(queryParams)
  });
  console.log(data);
  return (
    <div className="bg-gray-200 py-6">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <AsideFilter />
          </div>
          <div className="col-span-9">
            <SortProductList />
            <div className="mt-6 flex flex-row flex-wrap gap-3 ">
              {data &&
                data.data.data.products.map((product) => (
                  <div className="max-w-[176px] " key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
