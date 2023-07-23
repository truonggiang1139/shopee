import React, { useState } from "react";
import AsideFilter from "./AsideFilter";
import SortProductList from "./SortProductList";
import Product from "./Product";
import { useQuery } from "@tanstack/react-query";
import useQueryParams from "src/hooks/useQueryParams";
import { getProducts } from "src/apis/product.api";
import Pagination from "src/components/Pagination";

export default function ProductList() {
  const [page, setPage] = useState(1);
  const queryParams = useQueryParams();
  const { data } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => getProducts(queryParams)
  });
  console.log(data);
  return (
    <div className="bg-[#f5f5fa] py-6">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <AsideFilter />
          </div>
          <div className="col-span-9">
            <SortProductList />
            <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {data &&
                data.data.data.products.map((product) => (
                  <div className="col-span-1" key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
            </div>
            <Pagination page={page} setPage={setPage} pageSize={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
