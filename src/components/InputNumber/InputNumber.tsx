import React, { InputHTMLAttributes, forwardRef } from "react";
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  classNameInput?: string;
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  { errorMessage, classNameInput, onChange, ...rest },
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
      <input className={classNameInput} onChange={handleChange} {...rest} ref={ref} />
      <div className="mt-1 min-h-[1.25rem] text-sm text-red-600">{errorMessage}</div>
    </div>
  );
});
export default InputNumber;
