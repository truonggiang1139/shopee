import { useEffect, useState } from "react";

interface IProps {
  value?: Date;
  onChange: (date: Date) => void;
  errorMessage?: string;
}
export default function DateSelector({ value, onChange, errorMessage }: IProps) {
  const [date, setDate] = useState({
    date: value?.getDate() || 28,
    month: value?.getMonth() || 9,
    year: value?.getFullYear() || 2000
  });
  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      });
    }
  }, [value]);

  const handleChangeDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = event.target;
    const newDate = {
      ...date,
      [name]: Number(valueFromSelect)
    };
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date));
  };
  return (
    <>
      <div className="flex justify-between">
        <select
          name="date"
          value={date.date}
          onChange={handleChangeDate}
          className="h-10 w-[32%] rounded-sm border border-black/10 px-3 outline-crimson"
        >
          <option hidden>Ngày</option>
          {Array(31)
            .fill(0)
            .map((_, index) => (
              <option value={index + 1} key={index}>
                {index + 1}
              </option>
            ))}
        </select>
        <select
          name="month"
          value={date.month}
          onChange={handleChangeDate}
          className="h-10 w-[32%] rounded-sm border border-black/10 px-3 outline-crimson"
        >
          <option hidden>Tháng</option>
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <option key={index}>{index + 1}</option>
            ))}
        </select>
        <select
          name="year"
          value={date.year}
          onChange={handleChangeDate}
          className="h-10 w-[32%] rounded-sm border border-black/10 px-3 outline-crimson"
        >
          <option hidden>Năm</option>
          {Array(110)
            .fill(0)
            .map((_, index) => (
              <option key={index}>{2023 - index}</option>
            ))}
        </select>
      </div>
      <div className="mt-2 min-h-[1.25rem] text-sm text-red-600">{errorMessage}</div>
    </>
  );
}
