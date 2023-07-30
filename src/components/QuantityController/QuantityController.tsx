import React, { InputHTMLAttributes } from "react";
import InputNumber from "../InputNumber";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  maxQuantity?: number;
  onChangeBuyCount: (value: number) => void;
}
export default function QuantityController({ maxQuantity, onChangeBuyCount, value, ...rest }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let valueQuantity = Number(event.target.value);
    if (maxQuantity !== undefined && valueQuantity > maxQuantity) {
      valueQuantity = maxQuantity;
    } else if (valueQuantity < 1) {
      valueQuantity = 1;
    }
    onChangeBuyCount && onChangeBuyCount(valueQuantity);
  };
  const increaseQuantity = () => {
    let valueQuantity = Number(value) + 1;
    if (maxQuantity !== undefined && valueQuantity > maxQuantity) {
      valueQuantity = maxQuantity;
    }
    onChangeBuyCount && onChangeBuyCount(valueQuantity);
  };

  const decreaseQuantity = () => {
    let valueQuantity = Number(value) - 1;
    if (valueQuantity < 1) {
      valueQuantity = 1;
    }
    onChangeBuyCount && onChangeBuyCount(valueQuantity);
  };
  return (
    <div className="ml-10 flex items-center">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-l border border-r-0 border-gray-300 text-gray-600"
        onClick={decreaseQuantity}
      >
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
        value={value}
        onChange={handleChange}
        className="h-8 w-14 border-b border-t border-gray-300 p-1 text-center font-semibold outline-none"
      />
      <button
        className="flex h-8 w-8 items-center justify-center rounded-r border border-l-0 border-gray-300 text-gray-600"
        onClick={increaseQuantity}
      >
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
  );
}
