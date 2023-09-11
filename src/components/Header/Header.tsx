import { Link, createSearchParams, useNavigate } from "react-router-dom";
import Popover from "../Popover";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile, logoutAccount } from "src/apis/auth.api";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY, path, purchaseStatus } from "src/utils/constants";
import useQueryConfig from "src/hooks/useQueryConfig";
import { useForm } from "react-hook-form";
import { searchSchema, SearchSchema } from "src/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { omit } from "lodash";
import { ObjectSchema } from "yup";
import { getPurchases } from "src/apis/purchase.api";
import { formatCurrency, getAvatarURL } from "src/utils/utils";

const MAX_PURCHASES = 5;
export default function Header() {
  const queryConfig = useQueryConfig();
  const { register, handleSubmit } = useForm<SearchSchema>({
    defaultValues: {
      search: ""
    },
    resolver: yupResolver<SearchSchema>(searchSchema as ObjectSchema<SearchSchema>)
  });
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile
  });
  const { data: dataPurchaseInCart } = useQuery({
    queryKey: ["purchases", { status: purchaseStatus.inCart }],
    queryFn: () => getPurchases({ status: purchaseStatus.inCart })
  });
  const purchasesInCart = dataPurchaseInCart?.data.data;
  const logoutMutation = useMutation({
    mutationFn: logoutAccount,
    onSuccess: () => {
      Cookies.remove(ACCESS_TOKEN_KEY);
      navigate(path.login);
    }
  });
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  const onSubmitSearch = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit({
          ...queryConfig,
          name: data.search || ""
        })
      ).toString()
    });
  });
  return (
    <div className="bg-crimson pb-5 pt-2 text-white">
      <div className="container">
        <div className="flex justify-end">
          <Popover
            title={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
                <span className="mx-1">Tiếng Việt</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </>
            }
            renderPopover={
              <div className="relative flex flex-col rounded-sm bg-white py-2 pl-3 pr-24 shadow-md">
                <button className="px-3 py-2 hover:text-crimson ">Tiếng Việt</button>
                <button className="px-3 py-2 hover:text-crimson">English</button>
              </div>
            }
          />

          <Popover
            title={
              <>
                <div className="ml-4 mr-1 h-6 w-6 flex-shrink-0">
                  <img
                    src={getAvatarURL(data?.data.data.avatar)}
                    alt=""
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div>{data?.data.data.email}</div>
              </>
            }
            renderPopover={
              <div className="relative rounded-sm  bg-white shadow-md">
                <div className="flex flex-col px-3 py-2">
                  <Link to={path.profile} className="px-3 py-3 text-left hover:bg-[#fafafa] hover:text-[#00bfa5]">
                    Tài khoản của tôi
                  </Link>
                  <Link
                    to={path.historyPurchase}
                    className="px-3 py-3 text-left hover:bg-[#fafafa] hover:text-[#00bfa5]"
                  >
                    Đơn mua
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-3 text-left hover:bg-[#fafafa] hover:text-[#00bfa5]"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            }
          />
        </div>
        <div className="mt-4 grid grid-cols-12 items-end gap-4">
          <Link to="/" className="col-span-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-14 w-14">
              <path d="M0 0h512v512H0z" fill="#C92127" fillOpacity={1} />
              <g>
                <path
                  d="M213.705 344.935l2.7 53.87h-26.24l-19.46-55.41zm150.56.33l-.34 4.38 18.15 49.16h24.44l-5.66-56.51a326.16 326.16 0 0 1-36.57 2.97zm32.79-164.08a90.06 90.06 0 0 0 13.05-1.12c51.2-7.62 36.49-49.56 36.49-49.56s-40.36 9-52.83 23.42c.02 0-28.12 27.26 3.31 27.26zm81.85-25.33s-6.81 0-15.92.82a47 47 0 0 1-13.28 22.9 116.55 116.55 0 0 1 7.44 14.09c25.25-9.43 21.79-37.81 21.79-37.81zm11.8 100.18v41.49s-53.15 31.9-134.5 31.9c-2.19 0-4.44-.15-6.67-.2l-5.48 69.58h-19l-24.45-66.86-162.59-5.87-9.4 72.73h-22.63s-48.15-101.58-23.18-182.06c-5.55-3.84-11.38-8.17-16.73-12.7-5.13 2.65-10.26 4.11-15 3.85-15.76-.85-28.37-12.73-29.78-14.09l11.16-11.46c2.6 2.5 11.21 9.13 19.48 9.57a7.93 7.93 0 0 0 1.7-.11 46.36 46.36 0 0 1-4.59-6.47c-5.65-9.83-7-20.32-3.84-28.79a25.1 25.1 0 0 1 15.94-14.87c11.29-3.81 26.85-3.35 34.75 4.9 2.94 3.07 7.24 9.84 3 20.7-3.59 9.29-10.85 19.34-19.36 27.12 2.87 2.3 5.94 4.61 9.09 6.87 9.46-20.85 24.84-39.58 48.52-53.76a238.9 238.9 0 0 1 124-34.31 259.14 259.14 0 0 1 120.54 30.12 80.94 80.94 0 0 0-7.77 9.25c-7.6 10.67-9.67 20.49-6.15 29.19 2.85 7 10.23 15.42 29.24 15.42a105 105 0 0 0 15.41-1.3 80.49 80.49 0 0 0 24-7.18c15.75 25.72 17.22 58.67 28 61 12.79 2.72 26.29 6.34 26.29 6.34zm-406.69-94.52c.43-1.12 1.05-3.11.32-3.87-1.32-1.38-4.81-2.26-8.92-2.26a29.18 29.18 0 0 0-9.16 1.42c-3.13 1.05-5.12 2.81-6.09 5.38-1.46 3.95-.46 9.62 2.75 15.19a36.3 36.3 0 0 0 4.79 6.25c6.66-5.82 13.19-14.04 16.31-22.11zm331.14 81.55a9.05 9.05 0 1 0-9.05 9.05 9.05 9.05 0 0 0 9.05-9.05z"
                  fill="#fff"
                  fillOpacity={1}
                />
              </g>
            </svg>
            <span className="ml-2  font-semibold lg:text-4xl">Piglet</span>
          </Link>
          <form className="col-span-9" onSubmit={onSubmitSearch}>
            <div className="flex rounded-sm bg-white p-1">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm mong muốn..."
                className="flex-grow border-none bg-transparent px-3 py-2 text-black outline-none"
                {...register("search")}
              />
              <button className="flex-shrink-0 rounded-sm bg-crimson px-6 py-2 hover:opacity-90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className="col-span-1 justify-self-end">
            <Popover
              title={
                <Link to={path.cart} className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  {!!purchasesInCart?.length && (
                    <span className="absolute -right-3 -top-2 rounded-full bg-white px-2 py-[1px]  text-crimson">
                      {purchasesInCart.length}
                    </span>
                  )}
                </Link>
              }
              renderPopover={
                <div className="relative  max-w-[400px]  rounded-sm   bg-white text-sm shadow-md">
                  {purchasesInCart?.length ? (
                    <div className="p-2 ">
                      <div className="capitalize text-gray-400">Sản phẩm mới thêm</div>
                      <div className="mt-5">
                        {purchasesInCart.slice(0, 5).map((purchase) => (
                          <div className="mt-2 flex py-2 hover:bg-gray-50" key={purchase._id}>
                            <div className="flex-shrink-0">
                              <img
                                src={purchase.product.image}
                                alt={purchase.product.name}
                                className="h-11 w-11 object-cover"
                              />
                            </div>
                            <div className="ml-2 flex-grow overflow-hidden">
                              <div className="truncate">{purchase.product.name}</div>
                            </div>
                            <div className="ml-2 flex-shrink-0">
                              <span className="text-crimson">₫{formatCurrency(purchase.product.price)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <div className="text-xs capitalize text-gray-500">
                          {purchasesInCart.length > MAX_PURCHASES
                            ? `${purchasesInCart.length - MAX_PURCHASES} Thêm hàng vào giỏ`
                            : ""}
                        </div>

                        <Link
                          to={path.cart}
                          className="rounded-sm bg-crimson px-4 py-2 capitalize text-white hover:bg-opacity-90"
                        >
                          Xem giỏ hàng
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-[200px] w-[400px]  flex-col items-center justify-center p-2">
                      <img
                        className="h-24 w-24"
                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png"
                        alt=""
                      />
                      <div className="mt-3 text-sm capitalize">Chưa có sản phẩm</div>
                    </div>
                  )}
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
