import React, { InputHTMLAttributes, forwardRef } from "react";
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  { onChange, ...rest },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if ((/^\d+$/.test(value) || value === "") && onChange) {
      onChange(event);
    }
  };
  return (
    <div className="grow">
      <input
        className="w-full rounded-sm border border-gray-300 p-2 text-xs outline-none "
        onChange={handleChange}
        {...rest}
        ref={ref}
      />
    </div>
  );
});
export default InputNumber;
