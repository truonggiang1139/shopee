import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPurchases, updatePurchases } from "src/apis/purchase.api";
import CustomButton from "src/components/CustomButton";
import QuantityController from "src/components/QuantityController";
import { IPurchase } from "src/types/purchase.type";
import { path, purchaseStatus } from "src/utils/constants";
import { formatCurrency } from "src/utils/utils";

interface IExtenedPurchases extends IPurchase {
  disabled: boolean;
  checked: boolean;
}
export default function Cart() {
  const [extendedPurchases, setExtendedPurchases] = useState<IExtenedPurchases[]>([]);
  const { data: dataPurchaseInCart } = useQuery({
    queryKey: ["purchases", { status: purchaseStatus.inCart }],
    queryFn: () => getPurchases({ status: purchaseStatus.inCart })
  });
  const updatePurchaseMutation = useMutation({
    mutationFn: updatePurchases
  });
  const purchasesInCart = dataPurchaseInCart?.data.data;
  useEffect(() => {
    if (purchasesInCart) {
      setExtendedPurchases(
        purchasesInCart.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: false
        }))
      );
    }
  }, [purchasesInCart]);
  const isCheckedAll = extendedPurchases.every((purchase) => purchase.checked);
  const handleChangeChecked = (id: string) => {
    setExtendedPurchases((prev) => {
      return prev.map((item) => (item._id === id ? { ...item, checked: !item.checked } : item));
    });
  };
  const handleCheckedAll = () => {
    setExtendedPurchases((prev) => {
      return prev.map((item) => ({ ...item, checked: !isCheckedAll }));
    });
  };
  const handleChangQuantity = (index: number, value: number) => {
    const purchase = extendedPurchases[index];
    setExtendedPurchases((prev) => {
      return prev.map((item) => (item._id === purchase._id ? { ...item, disabled: true } : item));
    });
    updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value });
    setExtendedPurchases((prev) => {
      return prev.map((item) => (item._id === purchase._id ? { ...item, disabled: false, buy_count: value } : item));
    });
  };
  if (!purchasesInCart) return;
  return (
    <div className="bg-outline py-16">
      <div className="container">
        <div className="overflow-auto">
          <div className="min-w-[1000px]">
            <div className=" flex rounded-sm bg-white  py-5 text-sm capitalize  shadow">
              <div className="flex basis-[10%] items-center justify-center">
                <input
                  type="checkbox"
                  className="flex h-5 w-5 items-center justify-center accent-crimson"
                  checked={isCheckedAll}
                  onChange={handleCheckedAll}
                />
              </div>
              <div className="basis-[60%] justify-start">
                <span>Chọn tất cả ({purchasesInCart.length} sản phẩm)</span>
              </div>
              <div className="flex basis-[10%] items-center justify-center">Số lượng </div>
              <div className="flex basis-[10%] items-center justify-center">Thành tiền</div>
              <div className="flex basis-[10%] items-center justify-center">
                <button>
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="my-3 flex flex-col rounded-sm bg-white  py-5 text-sm capitalize  shadow">
              {extendedPurchases.map((purchase, index) => (
                <div
                  key={purchase._id}
                  className={classNames("my-2 flex ", {
                    "border-b py-2": index !== purchasesInCart.length - 1
                  })}
                >
                  <div className="flex basis-[10%] items-center justify-center">
                    <input
                      type="checkbox"
                      className="h-5 w-5 accent-crimson"
                      checked={purchase.checked}
                      onChange={() => handleChangeChecked(purchase._id)}
                    />
                  </div>
                  <div className="flex-grow basis-[15%] justify-center">
                    <Link className="h-20 w-20 flex-shrink-0" to={path.home}>
                      <img src={purchase.product.image} alt="" className="h-[120px] w-[120px]" />
                    </Link>
                  </div>
                  <div className="flex flex-grow basis-[45%] flex-col justify-between">
                    <Link className="line-clamp-2" to={path.home}>
                      {purchase.product.name}
                    </Link>
                    <div className="flex flex-row items-center justify-start">
                      <div className="text-base font-bold">{formatCurrency(purchase.product.price)}đ</div>
                      <div className="ml-3 text-sm text-gray-400 line-through">
                        {formatCurrency(purchase.product.price_before_discount)}đ
                      </div>
                    </div>
                  </div>
                  <div className=" flex basis-[10%] items-center justify-center">
                    <QuantityController
                      onChangeBuyCount={(value) => handleChangQuantity(index, value)}
                      classBtn="h-8 w-8"
                      classInput="h-8 w-8"
                      value={purchase.buy_count}
                      maxQuantity={purchase.product.quantity}
                      disabled={purchase.disabled}
                    />
                  </div>
                  <div className=" flex basis-[10%] items-center justify-center">
                    <div className="text-base font-bold text-crimson">{formatCurrency(purchase.product.price)}đ</div>
                  </div>
                  <div className=" flex basis-[10%] items-center justify-center">
                    <button>
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center">
              <div className="flex flex-shrink-0 items-center justify-center pr-3">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-crimson"
                  checked={isCheckedAll}
                  onChange={handleCheckedAll}
                />
              </div>
              <button className="mx-3 border-none bg-none">Chọn tất cả</button>
              <button className="mx-3 border-none bg-none">Xóa</button>

              <div className="mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center sm:justify-end">
                    <div>Tổng thanh toán (1 sản phẩm):</div>
                    <div className="text-orange ml-2 text-2xl">₫{formatCurrency(1)}</div>
                  </div>
                  <div className="flex items-center text-sm sm:justify-end">
                    <div className="text-gray-500">Tiết kiệm</div>
                    <div className="text-orange ml-6">₫{formatCurrency(1)}</div>
                  </div>
                </div>
                <button className="mt-5 flex h-10 w-52 items-center justify-center bg-crimson text-sm uppercase text-white hover:bg-crimson/90 sm:ml-4 sm:mt-0">
                  Mua hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
