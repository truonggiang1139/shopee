import classNames from "classnames";
import { Link, createSearchParams } from "react-router-dom";
import { QueryConfigType } from "src/types/product.types";
import { path } from "src/utils/constants";

interface Props {
  queryConfig: QueryConfigType;
  pageSize: number;
}
const RANGE = 2;
const FIRST_PAGE = 1;
export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page);
  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span key={index} className="mx-2  px-3 py-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="rgb(128, 128, 137)"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </span>
        );
      }
      return;
    };
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span key={index} className="mx-2  px-3 py-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="rgb(128, 128, 137)"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </span>
        );
      }
      return;
    };
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;
        if (page <= RANGE * 2 + 1 && pageNumber > page + 2 && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index);
        } else if (page >= pageSize - RANGE * 2 && pageNumber < page - 2 && pageNumber > RANGE) {
          return renderDotBefore(index);
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index);
          }
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              "mx-2 flex h-9 w-10 items-center justify-center rounded text-gray-500 hover:bg-red-200",
              {
                "bg-crimson text-white ": pageNumber === page
              }
            )}
          >
            {pageNumber}
          </Link>
        );
      });
  };
  return (
    <div className="mt-6 flex flex-wrap justify-center">
      <button
        disabled={page === FIRST_PAGE}
        className={classNames("mx-2 flex h-9 w-10 items-center justify-center rounded  text-gray-500 ", {
          "stroke-gray-300": page === FIRST_PAGE,
          "stroke-gray-700 hover:bg-red-200": page !== FIRST_PAGE
        })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      {renderPagination()}
      <button
        disabled={page === pageSize}
        className={classNames("mx-2 flex h-9 w-10 items-center justify-center rounded  text-gray-500 ", {
          "stroke-gray-300": page === pageSize,
          "stroke-gray-700 hover:bg-red-200": page !== pageSize
        })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
