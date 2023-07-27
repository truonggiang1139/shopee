import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductDetail } from "src/apis/product.api";
import InputNumber from "src/components/InputNumber";
import { formatCurrency, formatNumberToSocialStyle, formatPercent } from "src/utils/utils";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: productDetailData } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => getProductDetail(id as string)
  });
  const product = productDetailData?.data.data;
  if (!product) return;
  return (
    <div className="bg-outline py-6">
      <div className="bg-white p-4 shadow">
        <div className="container">
          <div className="grid grid-cols-12 gap-9">
            <div className="col-span-5">
              <div className="relative w-full pt-[100%] shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute left-0 top-0 h-full w-full bg-white object-cover"
                />
              </div>
              <div className="relative mt-4 grid grid-cols-5 gap-1">
                <button className="absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                {product.images.slice(0, 5).map((img, index) => {
                  const isActive = index === 0;
                  return (
                    <div className="relative w-full pt-[100%]" key={index}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute left-0 top-0 h-full w-full bg-white object-cover"
                      />
                      {isActive && <div className="absolute inset-0 border-2 border-crimson" />}
                    </div>
                  );
                })}
                <button className="absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-span-7">
              <h1 className="text-xl font-medium uppercase">{product.name}</h1>
              <div className="mt-3 flex items-center">
                <div className="text-sm">
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className="ml-1 text-gray-500">Đã bán</span>
                </div>
              </div>
              <div className="mt-8 flex items-center">
                <div className="ml-3 text-3xl font-medium text-crimson ">₫{formatCurrency(product.price)}</div>
                <div className="ml-3 text-gray-500 line-through">₫{formatCurrency(product.price_before_discount)}</div>
                <div className="ml-3 rounded-md bg-crimson px-2 py-1 text-white">
                  -{formatPercent(1 - product.price / product.price_before_discount)}
                </div>
              </div>
              <div className="mt-8 flex items-center">
                <div className="capitalize text-gray-500">Số lượng</div>
                <div className="ml-10 flex items-center">
                  <button className="flex h-8 w-8 items-center justify-center rounded-l border border-r-0 border-gray-300 text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                  </button>
                  <InputNumber
                    value={1}
                    className="h-8 w-14 border-b border-t border-gray-300 p-1 text-center font-semibold outline-none"
                  />
                  <button className="flex h-8 w-8 items-center justify-center rounded-r border border-l-0 border-gray-300 text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
