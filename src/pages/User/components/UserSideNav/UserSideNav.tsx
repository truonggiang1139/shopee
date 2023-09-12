import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { getProfile } from "src/apis/user.api";
import { path } from "src/utils/constants";
import { getAvatarURL } from "src/utils/utils";

export default function UserSideNav() {
  const { pathname } = useLocation();
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile
  });
  const userData = data?.data.data;
  if (!userData) return;
  return (
    <>
      <div className="flex items-center py-4">
        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
          <img src={getAvatarURL(userData?.avatar)} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex-grow overflow-hidden  pl-4">
          <div className="mb-2 font-extralight">Tài khoản của</div>
          <div className="mb-1 truncate text-base font-semibold">{userData.email}</div>
        </div>
      </div>
      <div className="mt-4">
        <Link
          to={path.profile}
          className={classNames("flex items-center  px-2 py-2 capitalize hover:bg-navSelected ", {
            "bg-navSelected": pathname === "/user/profile"
          })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mx-3 h-5 w-5 fill-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
          Thông tin tài khoản
        </Link>

        <Link
          to={path.changePassword}
          className={classNames("flex items-center  px-2 py-2 capitalize hover:bg-navSelected ", {
            "bg-navSelected": pathname === "/user/user/password/edit"
          })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mx-3 h-5 w-5 fill-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
              clipRule="evenodd"
            />
          </svg>
          Đổi mật khẩu
        </Link>

        <Link
          to={path.historyPurchase}
          className={classNames("flex items-center  px-2 py-2 capitalize hover:bg-navSelected ", {
            "bg-navSelected": pathname === "/user/history/purchase"
          })}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="mx-3 h-5 w-5 fill-gray-500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"></path>
          </svg>
          Quản lý đơn hàng
        </Link>
      </div>
    </>
  );
}
