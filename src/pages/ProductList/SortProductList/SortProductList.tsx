import React from "react";

export default function SortProductList() {
  return (
    <div className="bg-white p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <button className="h-8 rounded-md border border-crimson px-4  text-center text-sm capitalize  text-crimson hover:text-crimson">
            Phổ biến
          </button>
          <button className="h-8  px-4 text-center text-sm capitalize text-[#646464]  hover:text-crimson ">
            Mới nhất
          </button>
          <button className="h-8  px-4 text-center text-sm capitalize text-[#646464]  hover:text-crimson">
            Bán chạy
          </button>
          <button className="h-8  px-4 text-center text-sm capitalize text-[#646464]  hover:text-crimson">
            Giá Thấp Đến Cao
          </button>
          <button className="h-8  px-4 text-center text-sm capitalize text-[#646464] hover:text-crimson">
            Giá Cao Đến Thấp
          </button>
        </div>
        <div className="flex items-center">
          <div>
            <span className="text-crimson">1</span>
            <span>/2</span>
          </div>
          <div className="ml-2">
            <button className="rouned-tl-sm h-8 cursor-not-allowed rounded-bl-sm bg-white/60 px-3 hover:bg-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-3 w-3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button className="rouned-tr-sm h-8  rounded-br-sm bg-white px-3 hover:bg-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-3 w-3"
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
