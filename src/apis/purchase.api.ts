import { IPurchase, PurchaseListStatusType } from "src/types/purchase.type";
import { SuccessResponse } from "src/types/utils.type";
import http from "src/utils/http";
export const addToCart = (body: { product_id: string; buy_count: number }) =>
  http.post<SuccessResponse<IPurchase>>("purchases/add-to-cart", body);

export const getPurchases = (params: { status: PurchaseListStatusType }) =>
  http.get<SuccessResponse<IPurchase[]>>("purchases", { params });
