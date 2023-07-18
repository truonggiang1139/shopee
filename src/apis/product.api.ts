import { IProduct, IProductList, IProductListConfig } from "src/types/product.types";
import { SuccessResponse } from "src/types/utils.type";
import http from "src/utils/http";

export const getProducts = (params: IProductListConfig) =>
  http.get<SuccessResponse<IProductList>>("/products", { params });

export const getProductDetail = (id: string) => http.get<SuccessResponse<IProduct>>(`/products/${id}`);
