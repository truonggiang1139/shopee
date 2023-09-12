import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { Link, createSearchParams } from "react-router-dom";
import { getPurchases } from "src/apis/purchase.api";
import useQueryParams from "src/hooks/useQueryParams";
import { PurchaseListStatusType } from "src/types/purchase.type";
import { path, purchaseStatus } from "src/utils/constants";
import { formatCurrency, generateNameId } from "src/utils/utils";

const purchaseTabs = [
  { status: purchaseStatus.all, name: "Tất cả" },
  { status: purchaseStatus.waitForConfirmation, name: "Chờ xác nhận" },
  { status: purchaseStatus.waitForGetting, name: "Đang xử lý" },
  { status: purchaseStatus.inProgress, name: "Đang vận chuyển" },
  { status: purchaseStatus.delivered, name: "Đã giao" },
  { status: purchaseStatus.cancelled, name: "Đã hủy" }
];

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams();
  const status: number = Number(queryParams.status) || purchaseStatus.all;
  const { data: dataPurchase } = useQuery({
    queryKey: ["purchases", { status }],
    queryFn: () => getPurchases({ status: status as PurchaseListStatusType }),
    keepPreviousData: true
  });
  const purchaseList = dataPurchase?.data.data;

  if (!purchaseList) return;
  return (
    <div>
      <div className="sticky top-0 z-30 flex rounded-t-sm shadow-sm">
        {purchaseTabs.map((tab) => (
          <Link
            to={{
              pathname: path.historyPurchase,
              search: createSearchParams({
                status: String(tab.status)
              }).toString()
            }}
            className={classNames("flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center", {
              "border-b-crimson text-crimson": status === tab.status,
              "border-b-black/10 text-gray-900": status !== tab.status
            })}
            key={tab.status}
          >
            {tab.name}
          </Link>
        ))}
      </div>
      <div className="container mt-3 px-0">
        <div className="overflow-auto">
          <div className="min-w-[963px]">
            <div className="flex flex-col rounded-sm bg-white  py-5 text-sm capitalize  shadow">
              {purchaseList.length ? (
                <>
                  {purchaseList.map((purchase) => (
                    <div key={purchase._id} className="my-2 flex border-b pb-2">
                      <div className="ml-2 flex-grow basis-[10%] justify-center">
                        <Link
                          className="relative h-20 w-20 flex-shrink-0"
                          to={`${path.home}${generateNameId({
                            name: purchase.product.name,
                            id: purchase.product._id
                          })}`}
                        >
                          <img
                            src={purchase.product.image}
                            alt=""
                            className="h-[80px] w-[80px] border-[0.5px] border-solid border-[#EEEEEE] object-cover pl-2"
                          />
                          <span className="absolute bottom-0 right-4 flex h-7 w-7 items-center justify-center rounded-tl-[10px] bg-gray-100 text-xs">
                            x{purchase.buy_count}
                          </span>
                        </Link>
                      </div>
                      <div className="flex flex-grow basis-[70%] flex-col justify-between">
                        <Link className="line-clamp-2" to={path.home}>
                          {purchase.product.name}
                        </Link>
                      </div>
                      <div className=" mr-6 flex basis-[20%] flex-col items-end justify-between">
                        <div className="text-sm">{formatCurrency(purchase.product.price)}đ</div>
                        <div className="flex items-center text-[17px]">
                          <span className="mr-1 text-zinc-400">Tổng tiền: </span>
                          <span>{formatCurrency(purchase.product.price * purchase.buy_count)}đ</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex  flex-col items-center justify-center p-2">
                  <img
                    className="h-44 w-44"
                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png"
                    alt=""
                  />
                  <div className="mt-5 text-sm ">Chưa có đơn hàng.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
