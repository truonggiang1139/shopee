import { InputHTMLAttributes } from "react";
import type { UseFormRegister } from "react-hook-form";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  name: string;
  register: UseFormRegister<any>;
}
export default function Input({ type, errorMessage, placeholder, className, name, register }: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        className="w-full rounded-sm border border-gray-300 p-2 outline-none focus:border-gray-500 focus:shadow-sm"
        placeholder={placeholder}
        {...register(name)}
      />
      <div className="mt-1 min-h-[1.25rem] text-sm text-red-600">{errorMessage}</div>
    </div>
  );
}
