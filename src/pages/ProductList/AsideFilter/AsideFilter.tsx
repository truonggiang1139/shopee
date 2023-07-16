import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "src/components/CustomButton";
import Input from "src/components/Input";
import { path } from "src/utils/constants";

export default function AsideFilter() {
  return (
    <div className="py-4">
      <Link to={path.home} className="flex items-center font-bold">
        <svg viewBox="0 0 12 10" className="mr-3 h-4 w-3 fill-current">
          <g fillRule="evenodd" stroke="none" strokeWidth={1}>
            <g transform="translate(-373 -208)">
              <g transform="translate(155 191)">
                <g transform="translate(218 17)">
                  <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className="my-4 h-[1px] bg-gray-300"></div>
      <ul>
        <li className="py-2 pl-2">
          <Link to={path.home} className="relative px-2 font-semibold text-crimson">
            <svg viewBox="0 0 4 7" className="absolute left-[-10px] top-1 h-2 w-2 fill-crimson">
              <polygon points="4 3.5 0 0 0 7" />
            </svg>
            Thời trang nam
          </Link>
        </li>
        <li className="py-2 pl-2">
          <Link to={path.home} className="relative px-2 ">
            Dien thoai
          </Link>
        </li>
      </ul>
      <Link to={path.home} className="mt-4 flex items-center font-bold uppercase">
        <svg
          enableBackground="new 0 0 15 15"
          viewBox="0 0 15 15"
          x={0}
          y={0}
          className="mr-3 h-4 w-3 fill-current stroke-current"
        >
          <g>
            <polyline
              fill="none"
              points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bo loc tim kiem
      </Link>
      <div className="my-4 h-[1px] bg-gray-300"></div>
      <div className="my-5">
        <div>Khoảng giá</div>
        <form className="mt-2">
          <div className="flex items-start">
            <div className="grow">
              <input
                type="text"
                name="from"
                placeholder="₫ TỪ"
                className="w-full rounded-sm border border-gray-300 p-2 text-xs outline-none "
              />
            </div>
            <div className="mx-2 mt-2 shrink-0">-</div>
            <div className="grow">
              <input
                type="text"
                name="to"
                placeholder="₫ ĐẾN"
                className="w-full rounded-sm border border-gray-300 p-2 text-xs outline-none "
              />
            </div>
          </div>
          <CustomButton className="hover:bg-crimson-90 mt-4 flex w-full items-center justify-center bg-crimson p-2 text-sm uppercase text-white">
            Áp dụng
          </CustomButton>
        </form>
      </div>
    </div>
  );
}
