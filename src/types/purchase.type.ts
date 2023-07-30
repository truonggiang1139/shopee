import { IProduct } from "./product.types";

export type PurchaseStatusType = -1 | 1 | 2 | 3 | 4 | 5;
export type PurchaseListStatusType = PurchaseStatusType | 0;
export interface IPurchase {
  _id: string;
  buy_count: number;
  price: number;
  price_before_discount: number;
  status: PurchaseStatusType;
  user: string;
  product: IProduct;
  createdAt: string;
  updatedAt: string;
}
