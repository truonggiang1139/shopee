import classNames from "classnames";
import { omit } from "lodash";
import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { IProductListConfig, QueryConfigType } from "src/types/product.types";
import { order as orderCostant, path, sortBy } from "src/utils/constants";

interface Props {
  queryConfig: QueryConfigType;
  pageSize: number;
}
export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { sort_by = sortBy.createdAt, order } = queryConfig;
  const page = Number(queryConfig.page);
  const navigate = useNavigate();
  const isActiveSortBy = (
    sortByValue: Exclude<IProductListConfig["sort_by"], undefined>,
    orderValue?: Exclude<IProductListConfig["order"], undefined>
  ) => {
    if (orderValue) {
      return sort_by === sortByValue && order === orderValue;
    }
    return sort_by === sortByValue;
  };
  const handleSort = (
    sortByValue: Exclude<IProductListConfig["sort_by"], undefined>,
    orderValue?: Exclude<IProductListConfig["order"], undefined>
  ) => {
    if (orderValue) {
      navigate({
        pathname: path.home,
        search: createSearchParams({
          ...queryConfig,
          sort_by: sortByValue,
          order: orderValue
        }).toString()
      });
      return;
    }
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ["order"]
        )
      ).toString()
    });
  };
  const handleChangePage = (value: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        page: (page + value).toString()
      }).toString()
    });
  };
  return (
    <div className="bg-white p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            className={classNames("h-8 px-4  text-center text-sm capitalize hover:text-crimson", {
              "rounded-md border border-crimson text-crimson": isActiveSortBy(sortBy.view),
              "text-[#646464]": !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames("h-8 px-4  text-center text-sm capitalize hover:text-crimson", {
              "rounded-md border border-crimson text-crimson": isActiveSortBy(sortBy.createdAt),
              "text-[#646464]": !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames("h-8 px-4  text-center text-sm capitalize hover:text-crimson", {
              "rounded-md border border-crimson text-crimson": isActiveSortBy(sortBy.sold),
              "text-[#646464]": !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <button
            className={classNames("h-8 px-4  text-center text-sm capitalize hover:text-crimson", {
              "rounded-md border border-crimson text-crimson": isActiveSortBy(sortBy.price, orderCostant.asc),
              "text-[#646464]": !isActiveSortBy(sortBy.price)
            })}
            onClick={() => handleSort(sortBy.price, orderCostant.asc)}
          >
            Giá Thấp Đến Cao
          </button>
          <button
            className={classNames("h-8 px-4  text-center text-sm capitalize hover:text-crimson", {
              "rounded-md border border-crimson text-crimson": isActiveSortBy(sortBy.price, orderCostant.desc),
              "text-[#646464]": !isActiveSortBy(sortBy.price)
            })}
            onClick={() => handleSort(sortBy.price, orderCostant.desc)}
          >
            Giá Cao Đến Thấp
          </button>
        </div>
        <div className="flex items-center">
          <div>
            <span className="text-crimson">{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className="ml-3 flex flex-row">
            <button
              className={classNames(" flex h-9 w-9 items-center justify-center  rounded  text-gray-500 ", {
                "stroke-gray-300": page === 1,
                "stroke-gray-700 ": page !== 1
              })}
              onClick={() => handleChangePage(-1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              disabled={page === pageSize}
              className={classNames("flex h-9 w-9 items-center justify-center  rounded  text-gray-500  ", {
                "stroke-gray-300": page === pageSize,
                "stroke-gray-700 ": page !== pageSize
              })}
              onClick={() => handleChangePage(1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
