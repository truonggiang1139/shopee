import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { IBody, getProfile, updateProfile } from "src/apis/user.api";
import { Controller, useForm } from "react-hook-form";
import { ChangePasswordSchema, changePasswordSchema } from "src/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";
import Input from "src/components/Input";
import { toast } from "react-toastify";
import InputNumber from "src/components/InputNumber";
import DateSelector from "../../components/DateSelector";
export default function ChangePassword() {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile
  });
  const userData = data?.data.data;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<ChangePasswordSchema>({
    defaultValues: {},
    resolver: yupResolver<ChangePasswordSchema>(changePasswordSchema as ObjectSchema<ChangePasswordSchema>)
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  if (!userData) return;
  return (
    <div className="rounded-sm bg-white px-2 pb-10 text-base shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">Đổi mật khẩu</h1>
      </div>
      <div className="mt-8 flex flex-col-reverse md:flex-row md:items-start ">
        <form className="mt-6 flex-grow pr-12 md:mt-0 md:border-r md:border-r-gray-200" onSubmit={onSubmit}>
          <div className="mt-3 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Mật khẩu hiện tại</div>
            <div className="sm:w-[80%] sm:pl-5 ">
              <Input name="password" register={register} errorMessage={errors.password?.message} />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Mật khẩu mới</div>
            <div className="sm:w-[80%] sm:pl-5 ">
              <Input
                name="new_password"
                type="password"
                register={register}
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Nhập lại mật khẩu mới</div>
            <div className="sm:w-[80%] sm:pl-5 ">
              <Input name="confirm_password" register={register} errorMessage={errors.confirm_password?.message} />
            </div>
          </div>
          <div className="mt-3 flex flex-col flex-wrap sm:flex-row">
            <div className="w-[20%] truncate pt-3 text-right capitalize"></div>
            <div className=" pl-5 ">
              <button type="submit" className="rounded bg-crimson px-4 py-3 text-white hover:bg-crimson/90">
                Lưu thay đổi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
