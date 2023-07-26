import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "src/types/product.types";
import { path } from "src/utils/constants";
import { formatCurrency, formatNumberToSocialStyle } from "src/utils/utils";

interface IProductProps {
  product: IProduct;
}
export default function Product({ product }: IProductProps) {
  return (
    <Link to={`${path.home}${product._id}`}>
      <div className="rounded-sm bg-white  hover:shadow-product">
        <div className="relative w-full pt-[100%]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute left-0 top-0 h-full w-full bg-white object-cover"
          />
        </div>
        <div className="overflow-hidden p-2 text-xs">
          <div className="line-clamp-2  min-h-[2rem] ">{product.name}</div>
          <div className="mt-3 flex items-center">
            <div className="ml-1 truncate text-crimson">
              <span>₫</span>
              <span className="text-base">{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center">
            <div className="ml-1">
              <span>Đã bán {formatNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
