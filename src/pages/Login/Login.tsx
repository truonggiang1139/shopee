import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { loginSchema, LoginSchema } from "src/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema)
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <div className="bg-orange">
      <div className="custom container">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form className="rounded bg-white p-10 shadow-sm" onSubmit={onSubmit} noValidate>
              <div className="text-2xl">Đăng ký</div>
              <div className="mt-8">
                <input
                  type="email"
                  className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm"
                  placeholder="Email"
                  {...register("email", rules.email)}
                />
                <div className="mt-1 min-h-[1.25rem] text-sm text-red-600"></div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm"
                  placeholder="Password"
                  {...register("password", rules.password)}
                />
                <div className="mt-1 min-h-[1.25rem] text-sm text-red-600"></div>
              </div>

              <div className="mt-2">
                <button
                  type="submit"
                  className="flex  w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600"
                >
                  Đăng ký
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400">Bạn chưa có tài khoản?</span>
                <Link className="ml-1 text-red-400" to="/register">
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
