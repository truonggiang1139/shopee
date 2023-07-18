export interface IProduct {
  _id: string;
  images: string[];
  price: number;
  rating: number;
  price_before_discount: number;
  quantity: number;
  sold: number;
  view: number;
  name: string;
  description: string;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProductList {
  products: IProduct[];
  paginate: {
    page: number;
    limit: number;
    page_size: number;
  };
}

export interface IProductListConfig {
  page?: number;
  limit?: number;
  sort_by?: "createAt" | "view" | "sold" | "price";
  order?: "asc" | "desc";
  exclude?: string;
  price_max?: number;
  price_min?: number;
  name?: string;
}