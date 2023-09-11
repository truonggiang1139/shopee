import classNames from "classnames";
import React from "react";
import { Link, createSearchParams } from "react-router-dom";
import useQueryParams from "src/hooks/useQueryParams";
import { path, purchaseStatus } from "src/utils/constants";

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
  return (
    <div>
      <div className="sticky top-0 flex rounded-t-sm shadow-sm">
        <Link
          to={{
            pathname: path.historyPurchase,
            search: createSearchParams({
              status: String(purchaseStatus.all)
            }).toString()
          }}
          className={classNames("flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center", {
            "border-b-crimson text-crimson": status === purchaseStatus.all,
            "border-b-black/10 text-gray-900": status !== purchaseStatus.all
          })}
        ></Link>
      </div>
    </div>
  );
}
