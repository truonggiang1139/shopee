import * as yup from "yup";

function checkMinMaxPrice(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max }: { price_min: string; price_max: string } = this.parent;
  if (price_min !== "" && price_max !== "") {
    return Number(price_max) >= Number(price_min);
  }
  return price_min !== "" || price_max !== "";
}
export const schema = yup.object({
  email: yup
    .string()
    .required("Email là bắt buộc")
    .email("Email sai định dạng")
    .min(5, "Độ dài từ 5 -160 ký tự")
    .max(160, "Độ dài từ 5 -160 ký tự"),
  password: yup
    .string()
    .required("Password là bắt buộc")
    .min(6, "Độ dài từ 6 -160 ký tự")
    .max(160, "Độ dài từ 6 -160 ký tự"),
  confirm_password: yup
    .string()
    .required("Password là bắt buộc")
    .min(6, "Độ dài từ 6 -160 ký tự")
    .max(160, "Độ dài từ 6 -160 ký tự")
    .oneOf([yup.ref("password")], "Nhập lại password"),
  price_min: yup.string().test({
    name: "price-not-allowed",
    message: "Giá không phù hợp",
    test: checkMinMaxPrice
  }),
  price_max: yup.string().test({
    name: "price-not-allowed",
    message: "Giá không phù hợp",
    test: checkMinMaxPrice
  }),
  search: yup.string().trim()
});
export const loginSchema = schema.omit(["confirm_password", "price_max", "price_min"]);
export const registerSchema = schema.omit(["price_max", "price_min"]);
export const rangePriceSchema = schema.pick(["price_max", "price_min"]);
export const searchSchema = schema.pick(["search"]);
export type LoginSchema = yup.InferType<typeof loginSchema>;
export type RegisterSchema = yup.InferType<typeof registerSchema>;
export type RangePriceSchema = yup.InferType<typeof rangePriceSchema>;
export type SearchSchema = yup.InferType<typeof searchSchema>;
