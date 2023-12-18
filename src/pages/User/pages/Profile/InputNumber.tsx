import { TextInput } from "@mantine/core";
import React, { InputHTMLAttributes } from "react";
export interface InputNumberProps {
  inputProps: any;
}
export default function InputNumber({ inputProps }: InputNumberProps) {
  const { value, onChange } = inputProps;
  console.log(inputProps);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/^\d+$/.test(value) || value === "") {
      onChange?.(value);
    }
  };
  return <TextInput value={value} onChange={handleChange} />;
}
