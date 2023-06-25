import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "src/components/Input";
import { getRules } from "src/utils/rules";

interface iFormData {
  email: string;
  password: string;
  confirm_password: string;
}
export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<iFormData>();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  const rules = getRules(getValues);
  return (
    <div className="bg-orange">
      <div className="custom container">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form className="rounded bg-white p-10 shadow-sm" onSubmit={onSubmit} noValidate>
              <div className="text-2xl">Đăng ký</div>
              <Input
                name="email"
                register={register}
                type="email"
                className="mt-8"
                errorMessage={errors.email?.message}
                placeholder="Email"
                rules={rules.email}
              />

              <Input
                name="password"
                register={register}
                type="password"
                className="mt-2"
                errorMessage={errors.password?.message}
                placeholder="Password"
                rules={rules.password}
              />
              <Input
                name="confirm_password"
                register={register}
                type="password"
                className="mt-2"
                errorMessage={errors.confirm_password?.message}
                placeholder="Confirm Password"
                rules={rules.confirm_password}
              />
              <div className="mt-2">
                <button
                  type="submit"
                  className="flex  w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600"
                >
                  Đăng ký
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400">Bạn đã có tài khoản?</span>
                <Link className="ml-1 text-red-400" to="/login">
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
