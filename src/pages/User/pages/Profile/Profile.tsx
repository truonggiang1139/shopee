import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { IBody, getProfile, updateProfile } from "src/apis/user.api";
import { Controller, useForm } from "react-hook-form";
import { UserSchema, userSchema } from "src/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";
import Input from "src/components/Input";
import InputNumber from "src/components/InputNumber";
export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile
  });
  const userMutation = useMutation({
    mutationFn: (body: IBody) => updateProfile(body)
  });
  const userData = data?.data.data;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<UserSchema>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      avatar: "",
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver<UserSchema>(userSchema as ObjectSchema<UserSchema>)
  });

  const onSubmit = handleSubmit((data) => {
    userMutation.mutate(data, {
      onSuccess: () => {},
      onError: (error) => {}
    });
  });
  const handleSelectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("phone", userData.phone);
      setValue("address", userData.address);
      setValue("avatar", userData.avatar);
      setValue("date_of_birth", userData.date_of_birth ? new Date(userData.date_of_birth) : new Date(1990, 0, 1));
    }
  }, [setValue, userData]);
  if (!userData) return;
  return (
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">Thông tin cá nhân</h1>
      </div>
      <div className="mt-8 flex flex-col-reverse md:flex-row md:items-start ">
        <form className="mt-6 flex-grow pr-12 md:mt-0 md:border-r md:border-r-gray-200" onSubmit={onSubmit} noValidate>
          <div className="flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Email</div>
            <div className="sm:w-[80%] sm:pl-5 ">
              <div className="pt-3 text-gray-700">{userData.email}</div>
            </div>
          </div>
          <div className="mt-3 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Tên</div>
            <div className="sm:w-[80%] sm:pl-5 ">
              <Input name="name" register={register} errorMessage={errors.name?.message} />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Số điện thoại</div>
            <div className="sm:w-[80%] sm:pl-5 ">
              <Input name="phone" register={register} errorMessage={errors.name?.message} />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Địa chỉ</div>
            <div className="sm:w-[80%] sm:pl-5 ">
              <Input name="address" register={register} errorMessage={errors.address?.message} />
            </div>
          </div>

          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="w-[20%] truncate pt-3 text-right capitalize">Ngày sinh</div>
            <div className="w-[80%] pl-5 ">
              <div className="flex justify-between">
                <select className="h-10 w-[32%] rounded-sm border border-black/10 px-3 outline-crimson">
                  <option disabled>Ngày</option>
                </select>
                <select className="h-10 w-[32%] rounded-sm border border-black/10 px-3 outline-crimson">
                  <option disabled>Tháng</option>
                </select>
                <select className="h-10 w-[32%] rounded-sm border border-black/10 px-3 outline-crimson">
                  <option disabled>Năm</option>
                </select>
              </div>
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

        <div className="flex justify-center md:w-72 ">
          <div className="flex flex-col items-center">
            <div className="my-5 h-24 w-24">
              <img
                src="https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?w=2000"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <input type="file" accept=".jpg,.jpeg,.png" className="hidden" ref={fileInputRef} />
            <button onClick={handleSelectImage}>Select IMG</button>
          </div>
        </div>
      </div>
    </div>
  );
}
