import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPurchases } from "src/apis/purchase.api";
import { purchaseStatus } from "src/utils/constants";

export default function Cart() {
  const { data: dataPurchaseInCart } = useQuery({
    queryKey: ["purchases", { status: purchaseStatus.inCart }],
    queryFn: () => getPurchases({ status: purchaseStatus.inCart })
  });
  const purchasesInCart = dataPurchaseInCart;
  return (
    <div className="bg-outline py-16">
      <div className="container">
        <div className="overflow-auto">
          <div className="min-w-[1000px]">
            <div className="grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
