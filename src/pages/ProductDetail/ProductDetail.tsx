import { useMutation, useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail, getProducts } from "src/apis/product.api";

import { IProduct } from "src/types/product.types";
import { formatCurrency, formatNumberToSocialStyle, formatPercent, getIdFromNameId } from "src/utils/utils";
import QuantityController from "src/components/QuantityController";
import { addToCart } from "src/apis/purchase.api";
export default function ProductDetail() {
  const [buyCount, setBuyCount] = useState(1);
  const { nameId } = useParams();
  const id = getIdFromNameId(nameId as string);
  const { data: productDetailData } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => getProductDetail(id as string)
  });
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    arrows: false,
    draggable: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  };
  const [currentIndexImageList, setCurrentIndexImageList] = useState([0, 5]);
  const [activeImg, setActiveImg] = useState("");
  const product = productDetailData?.data.data;
  const currentImages = useMemo(
    () => (product ? product?.images.slice(...currentIndexImageList) : []),
    [product, currentIndexImageList]
  );
  const queryConfig = { limit: 12, page: 1, category: product?.category._id };

  const addProductToCart = useMutation({
    mutationFn: addToCart
  });

  useEffect(() => {
    if (product && product.images.length) {
      setActiveImg(product.images[0]);
    }
  }, [product]);
  const chooseActive = (img: string) => {
    setActiveImg(img);
  };
  const nextImageList = () => {
    if (currentIndexImageList[1] < (product as IProduct).images.length) {
      setCurrentIndexImageList((prev) => [prev[0] + 1, prev[1] + 1]);
    }
  };
  const previousImageList = () => {
    if (currentIndexImageList[0]) {
      setCurrentIndexImageList((prev) => [prev[0] - 1, prev[1] - 1]);
    }
  };
  const handleBuyCount = (value: number) => {
    setBuyCount(value);
  };
  const handleAddToCart = () => {
    addProductToCart.mutate({ product_id: product?._id as string, buy_count: buyCount });
  };
  if (!product) return;
  return (
    <div className="bg-outline py-6">
      <div className="container ">
        <div className="rounded-md bg-white p-4 shadow">
          <div className="grid grid-cols-11 gap-10">
            <div className="col-span-4 ">
              <div className="relative h-[200px] w-full pt-[100%] shadow">
                <img
                  src={activeImg}
                  alt={product.name}
                  className="absolute left-0 top-0 h-full w-full bg-white object-cover"
                />
              </div>
              <div className="relative mt-4 grid grid-cols-5 gap-1">
                <button
                  className="absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                  onClick={previousImageList}
                >
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
                {currentImages.map((img, index) => {
                  const isActive = img === activeImg;
                  return (
                    <div
                      className="relative w-full cursor-pointer pt-[100%]"
                      key={index}
                      onMouseEnter={() => chooseActive(img)}
                    >
                      <img
                        src={img}
                        alt={product.name}
                        className="absolute left-0 top-0 h-full w-full  bg-white object-cover"
                      />
                      {isActive && <div className="absolute inset-0 border-2 border-crimson" />}
                    </div>
                  );
                })}
                <button
                  className="absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                  onClick={nextImageList}
                >
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
            <div className="col-span-7 ">
              <h1 className="mt-8 text-xl font-medium uppercase ">{product.name}</h1>
              <div className="mt-3 flex items-center">
                <div className="text-sm">
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className="ml-1 text-gray-500">Đã bán</span>
                </div>
              </div>
              <div className="mt-12 flex items-center py-8">
                <div className="ml-3 text-3xl font-medium text-crimson ">₫{formatCurrency(product.price)}</div>
                <div className="ml-3 text-gray-500 line-through">₫{formatCurrency(product.price_before_discount)}</div>
                <div className="ml-3 rounded-md bg-crimson px-2 py-1 text-white">
                  -{formatPercent(1 - product.price / product.price_before_discount)}
                </div>
              </div>
              <div className="mt-10 flex items-center">
                <div className="capitalize text-gray-500">Số lượng</div>
                <QuantityController onChangeBuyCount={handleBuyCount} value={buyCount} maxQuantity={product.quantity} />
                <div className="ml-6 text-sm text-gray-500">{product.quantity} Sản phẩm có sẫn</div>
              </div>
              <div className="mt-10 flex items-center">
                <button
                  className="flex h-12 items-center justify-center rounded-lg border-2 border-crimson px-5 font-semibold capitalize text-crimson shadow-sm hover:bg-crimson/5"
                  onClick={handleAddToCart}
                >
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
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  <span>Thêm vào giỏ hàng</span>
                </button>
                <button className="ml-4 flex h-12 w-[220px] items-center justify-center rounded-lg bg-crimson px-5 capitalize text-white shadow-sm outline-none hover:bg-crimson/90">
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className=" mt-8 rounded-md bg-white p-4">
          <div className="p-4 text-lg font-semibold capitalize">Mô Tả Sản Phẩm</div>
          <div className="m-5 text-sm leading-loose">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
