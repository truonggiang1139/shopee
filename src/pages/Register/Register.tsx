import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "src/components/Input";
import { registerSchema, RegisterSchema } from "src/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { omit } from "lodash";
import { registerAccount } from "src/apis/auth.api";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";
import { ErrorResponse } from "src/types/utils.type";
import { toast } from "react-toastify";
import CustomButton from "src/components/CustomButton";
import { path } from "src/utils/constants";
import { ObjectSchema } from "yup";
type FormData = RegisterSchema;
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver<RegisterSchema>(registerSchema as ObjectSchema<RegisterSchema>)
  });
  const navigate = useNavigate();
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, "confirm_password">) => registerAccount(body)
  });
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ["confirm_password"]);
    registerAccountMutation.mutate(body, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, "confirm_password">>>(error)) {
          const formError = error.response?.data.data;
          if (formError?.email) {
            toast.error(formError.email);
          }
        }
      }
    });
  });
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
              />

              <Input
                name="password"
                register={register}
                type="password"
                className="relative mt-2"
                errorMessage={errors.password?.message}
                placeholder="Password"
              />
              <Input
                name="confirm_password"
                register={register}
                type="password"
                className="relative mt-2"
                errorMessage={errors.confirm_password?.message}
                placeholder="Confirm Password"
              />
              <div className="mt-3">
                <CustomButton
                  type="submit"
                  className=" flex w-full items-center justify-center bg-crimson px-2 py-4 text-sm uppercase text-white hover:opacity-90"
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                >
                  Đăng ký
                </CustomButton>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400">Bạn đã có tài khoản?</span>
                <Link className="ml-1 text-crimson" to={path.login}>
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
