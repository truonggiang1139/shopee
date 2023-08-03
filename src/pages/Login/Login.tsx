import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema, LoginSchema } from "src/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import Input from "src/components/Input";
import { useMutation } from "@tanstack/react-query";
import { loginAccount } from "src/apis/auth.api";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";
import { ErrorResponse } from "src/types/utils.type";
import { toast } from "react-toastify";
import CustomButton from "src/components/CustomButton";
import { path } from "src/utils/constants";
import { ObjectSchema } from "yup";
type FormData = LoginSchema;
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver<LoginSchema>(loginSchema as ObjectSchema<LoginSchema>)
  });
  const navigate = useNavigate();
  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body)
  });
  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data;
          if (formError?.password) {
            toast.error(formError.password);
          }
        }
      }
    });
  });
  return (
    <div>
      <div className="custom container">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form className="rounded bg-white p-10 shadow-sm" onSubmit={onSubmit} noValidate>
              <div className="text-2xl">Đăng nhập</div>
              <Input
                name="email"
                register={register}
                type="email"
                className="mt-8"
                errorMessage={errors.email?.message}
                placeholder="Email"
              />

              <Input
                name="password"
                register={register}
                type="password"
                className="mt-2"
                errorMessage={errors.password?.message}
                placeholder="Password"
              />

              <div className="mt-3">
                <CustomButton
                  type="submit"
                  className=" flex w-full items-center justify-center bg-crimson px-2 py-4 text-sm uppercase text-white hover:opacity-90"
                  isLoading={loginAccountMutation.isLoading}
                  disabled={loginAccountMutation.isLoading}
                >
                  Đăng nhập
                </CustomButton>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400">Bạn chưa có tài khoản?</span>
                <Link className="ml-1 text-crimson" to={path.register}>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
