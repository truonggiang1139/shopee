import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { omit } from "lodash";
import { Controller, useForm } from "react-hook-form";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import CustomButton from "src/components/CustomButton";
import InputNumber from "src/components/InputNumber";
import { ICategory } from "src/types/category.type";
import { QueryConfigType } from "src/types/product.types";
import { NoUndefinedField } from "src/types/utils.type";
import { path } from "src/utils/constants";
import { rangePriceSchema, RangePriceSchema } from "src/utils/rules";
import { ObjectSchema } from "yup";
interface Props {
  queryConfig: QueryConfigType;
  categories: ICategory[];
}
type FormData = NoUndefinedField<RangePriceSchema>;
export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig;
  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: "",
      price_max: ""
    },
    resolver: yupResolver<FormData>(rangePriceSchema as ObjectSchema<FormData>),
    shouldFocusError: false
  });
  console.log('c1');
  console.log('c2');
  
  
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    });
  });
  const handleRemoveFilter = () => {
    reset();
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ["price_max", "price_min", "category"])).toString()
    });
  };
  return (
    <div className="py-4">
      <Link to={path.home} className="flex items-center font-bold">
        <svg viewBox="0 0 12 10" className="mr-3 h-4 w-3 fill-current">
          <g fillRule="evenodd" stroke="none" strokeWidth={1}>
            <g transform="translate(-373 -208)">
              <g transform="translate(155 191)">
                <g transform="translate(218 17)">
                  <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className="my-4 h-[1px] bg-gray-300"></div>
      <ul>
        {categories.map((categoryItem) => {
          const isActive = categoryItem._id === category;
          return (
            <li key={categoryItem._id} className="py-2 pl-2">
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames("relative px-2 text-sm ", {
                  "text-crimson": isActive
                })}
              >
                {isActive && (
                  <svg viewBox="0 0 4 7" className="absolute left-[-10px] top-1 h-2 w-2 fill-crimson">
                    <polygon points="4 3.5 0 0 0 7" />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link to={path.home} className="mt-4 flex items-center font-bold uppercase">
        <svg
          enableBackground="new 0 0 15 15"
          viewBox="0 0 15 15"
          x={0}
          y={0}
          className="mr-3 h-4 w-3 fill-current stroke-current"
        >
          <g>
            <polyline
              fill="none"
              points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bo loc tim kiem
      </Link>
      <div className="my-4 h-[1px] bg-gray-300"></div>
      <div className="my-5">
        <div>Khoảng giá</div>
        <form className="mt-2" onSubmit={onSubmit}>
          <div className="flex items-start">
            <Controller
              control={control}
              name="price_min"
              render={({ field }) => {
                return (
                  <InputNumber
                    type="text"
                    name="from"
                    classNameInput="w-full rounded-sm border border-gray-300 p-2 text-xs outline-none"
                    placeholder="₫ TỪ"
                    onChange={(event) => {
                      field.onChange(event);
                      trigger("price_max");
                    }}
                    value={field.value}
                    ref={field.ref}
                  />
                );
              }}
            />
            <div className="mx-2 mt-2 shrink-0">-</div>
            <Controller
              control={control}
              name="price_max"
              render={({ field }) => {
                return (
                  <InputNumber
                    type="text"
                    name="to"
                    classNameInput="w-full rounded-sm border border-gray-300 p-2 text-xs outline-none"
                    placeholder="₫ ĐẾN"
                    onChange={(event) => {
                      field.onChange(event);
                      trigger("price_min");
                    }}
                    value={field.value}
                    ref={field.ref}
                  />
                );
              }}
            />
          </div>
          <div className="mt-1 min-h-[1.25rem] text-sm text-red-600">{errors.price_min?.message}</div>
          <CustomButton className="hover:bg-crimson-90 mt-4 flex w-full items-center justify-center bg-crimson p-2 text-sm uppercase text-white">
            Áp dụng222
          </CustomButton>
        </form>
      </div>
      <div className="my-4 h-[1px] bg-gray-300"></div>
      <CustomButton
        className="hover:bg-crimson-90 mt-4 flex w-full items-center justify-center bg-crimson p-2 text-sm uppercase text-white"
        onClick={handleRemoveFilter}
      >
        Xóa tất cả
      </CustomButton>
    </div>
  );
}
