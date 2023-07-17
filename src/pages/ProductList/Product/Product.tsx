import React from "react";
import { Link } from "react-router-dom";

export default function Product() {
  return (
    <Link to="/">
      <div className="rounded-sm bg-white  shadow transition-transform duration-100 hover:translate-y-[-0.0625rem] hover:shadow-md">
        <div className="relative w-full pt-[100%]">
          <img
            src="https://down-vn.img.susercontent.com/file/vn-11134201-7qukw-lil06k5z49os7a_tn"
            alt=""
            className="absolute left-0 top-0 h-full w-full bg-white object-cover"
          />
        </div>
        <div className="overflow-hidden p-2 text-xs">
          <div className="min-h-[2rem]  line-clamp-2 ">
            Tất vớ nam đen trắng cổ cao dài trung ngắn lười, tất thời trang co giãn Padas Store TN01 S3
          </div>
          <div className="mt-3 flex items-center">
            <div className="ml-1 truncate text-crimson">
              <span>₫</span>
              <span className="text-base">3.000</span>
            </div>
          </div>
          <div className="mt-3 flex items-center">
            <div className="ml-1">
              <span>Đã bán 5k</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
