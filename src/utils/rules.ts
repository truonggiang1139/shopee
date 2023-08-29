import * as yup from "yup";

function checkMinMaxPrice(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max }: { price_min: string; price_max: string } = this.parent;
  if (price_min !== "" && price_max !== "") {
    return Number(price_max) >= Number(price_min);
  }
  return price_min !== "" || price_max !== "";
}
const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required("Nhập lại password là bắt buộc")
    .min(6, "Độ dài từ 6 - 160 ký tự")
    .max(160, "Độ dài từ 6 - 160 ký tự")
    .oneOf([yup.ref(refString)], "Nhập lại password không khớp");
};
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
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
  confirm_password: handleConfirmPasswordYup("password"),
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
export const userSchema = yup.object({
  name: yup.string().max(160, "Độ dài tối đa là 160 ký tự"),
  phone: yup.string().max(20, "Độ dài tối đa là 20 ký tự"),
  address: yup.string().max(160, "Độ dài tối đa là 160 ký tự"),
  avatar: yup.string().max(1000, "Độ dài tối đa là 1000 ký tự"),
  date_of_birth: yup.date().max(new Date(), "Hãy chọn một ngày trong quá khứ")
});
export const changePasswordSchema = yup.object({
  password: schema.fields["password"],
  new_password: schema.fields["password"],
  confirm_password: handleConfirmPasswordYup("new_password")
});
export const loginSchema = schema.omit(["confirm_password", "price_max", "price_min"]);
export const registerSchema = schema.omit(["price_max", "price_min"]);
export const rangePriceSchema = schema.pick(["price_max", "price_min"]);
export const searchSchema = schema.pick(["search"]);
export type LoginSchema = yup.InferType<typeof loginSchema>;
export type RegisterSchema = yup.InferType<typeof registerSchema>;
export type RangePriceSchema = yup.InferType<typeof rangePriceSchema>;
export type SearchSchema = yup.InferType<typeof searchSchema>;
export type UserSchema = yup.InferType<typeof userSchema>;
export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>;
